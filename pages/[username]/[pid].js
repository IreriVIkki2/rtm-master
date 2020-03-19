import React, { Component } from "react";
import UserContext from "../../context/UserContext";
import { firebaseClient } from "../../utils/firebaseClient";
import Router from "next/router";
import Routines from "./routines";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        };

        this.subscribeDaysListener = this.subscribeDaysListener.bind(this);
        this.addRoutinesListener = this.addRoutinesListener.bind(this);
    }

    componentDidMount() {
        this.subscribeDaysListener();
    }

    componentDidUpdate() {
        const { days, mounted, routines } = this.state;

        if (!mounted && days && routines) {
            this.setState({ mounted: true });
        }
    }

    testProfile = () => {
        firebaseClient()
            .db.collection("profiles")
            .doc(this.context.user.uid)
            .set({ ...this.context.profile, updatedAt: Date.now() });
    };

    testDays = (did, day) => {
        console.log("object");
        firebaseClient()
            .db.collection("days")
            .doc(did)
            .set({ ...day, updatedAt: Date.now() })
            .catch(err => console.error(err));
    };

    render() {
        const { mounted, routines, days } = this.state;
        if (!mounted)
            return <h1 className="title title--sm mt-7">loading...</h1>;

        return (
            <div className="user-workout">
                <aside className="user-workout__aside">
                    <div className="user-workout__aside-banner">
                        <img src="" alt="" className="" />
                    </div>
                    {days.map(day => {
                        return (
                            <div key={day._id} className="">
                                <p
                                    onClick={() => {
                                        this.addRoutinesListener(day._id);
                                        this.setState({ routines: false });
                                    }}
                                    className="title title--md"
                                >
                                    Day {day.order}
                                </p>
                            </div>
                        );
                    })}
                </aside>
                <main className="user-workout__main">
                    <Routines routines={routines} />
                </main>
            </div>
        );
    }

    async addRoutinesListener(currentDayId) {
        console.log("extends -> addRoutinesListener -> addRoutinesListener");
        if (this.state.removeRoutinesListener) {
            this.state.removeRoutinesListener();
        }

        let removeRoutinesListener = await firebaseClient()
            .db.collection("routines")
            .where("dayId", "==", currentDayId)
            // .where("published", "==", true)
            .orderBy("order")
            .onSnapshot(docs => {
                let newRoutines = [];
                docs.forEach(doc => {
                    newRoutines.push(doc.data());
                });
                console.log(
                    "extends -> addRoutinesListener -> newRoutines",
                    newRoutines,
                );
                this.setState({
                    removeRoutinesListener,
                    routines: newRoutines,
                });
            });
    }

    async subscribeDaysListener() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
        }

        let unsubscribeDaysListener = await firebaseClient()
            .db.collection("days")
            .where("programId", "==", Router.query.pid.split("_id")[1])
            // .where("published", "==", true)
            .orderBy("order")
            .onSnapshot(docs => {
                let newDays = [];
                docs.forEach(doc => {
                    newDays.push(doc.data());
                });

                if (newDays.length > 0) {
                    this.addRoutinesListener(newDays[0]._id);
                }
                this.setState({
                    unsubscribeDaysListener,
                    days: newDays,
                });
            });
    }

    componentWillUnmount() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
            this.setState({ unsubscribeDaysListener: null });
        }
    }
}
