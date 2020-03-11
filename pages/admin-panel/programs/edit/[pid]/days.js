import React, { Component } from "react";
import AdminLayout from "../../../AdminLayout";
import firebaseCRUD from "../../../../../utils/firebaseCRUD";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import Router from "next/router";
import Routines from "./routines";
// import querystring from "querystring";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = { days: [], unsubscribeDaysListener: null, dayId: null };

        this.handleCreateNewDay = this.handleCreateNewDay.bind(this);
        this.addDaysListener = this.addDaysListener.bind(this);
    }

    shouldComponentUpdate(prevState, nextState) {
        return true;
    }

    componentDidMount() {
        this.addDaysListener();
    }

    componentDidUpdate() {
        // console.log(this.state);
    }

    async handleCreateNewDay() {
        const { query } = Router;
        const { days } = this.state;
        await firebaseCRUD
            .createNewDay(query.pid, days.length + 1)
            .then(dayId => {
                this.setState({ dayId });
                console.log(dayId);
            })
            .catch(err => console.error(err));
    }

    render() {
        const { days, dayId } = this.state;
        const currentDay = days.find(day => day._id === dayId);
        return (
            <AdminLayout hidden>
                <div style={{ display: "flex" }}>
                    <aside
                        style={{
                            borderRight: "solid 1px #242424",
                            paddingRight: "20px",
                            marginRight: "20px",
                        }}
                    >
                        <button onClick={this.handleCreateNewDay}>
                            Add Day
                        </button>
                        <ul>
                            {days.map(day => {
                                return (
                                    <li
                                        key={day._id}
                                        style={{
                                            backgroundColor:
                                                dayId === day._id
                                                    ? "turquoise"
                                                    : "",
                                        }}
                                    >
                                        <a
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                this.setState({
                                                    dayId: day._id,
                                                })
                                            }
                                        >
                                            Day {day.order}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>
                    <main>
                        {currentDay && (
                            <Routines day={currentDay} dayId={dayId}></Routines>
                        )}
                    </main>
                </div>
            </AdminLayout>
        );
    }

    componentWillUnmount() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
        }
    }

    addDaysListener() {
        let unsubscribeDaysListener = firebaseClient()
            .db.collection("days")
            .where("programId", "==", Router.query.pid)
            .orderBy("order")
            .onSnapshot(daysSnapshot => {
                let days = [];
                daysSnapshot.forEach(day => {
                    days.push(day.data());
                });
                this.setState({ days, dayId: days[0]._id });
            });
        this.setState({ unsubscribeDaysListener });
    }
}
