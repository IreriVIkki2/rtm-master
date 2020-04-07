import React, { Component } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import { dayInit, routineInit } from "../../../utils/init";
import Router from "next/router";
import AppContext from "../../../context/AppContext";
import ProgramDays from "../../../components/admin/programs/days";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = { days: [] };
    }

    componentDidMount() {
        const pid = Router.query.pid.split("_id")[1];
        const ref = firebaseClient()
            .db.collection("program")
            .doc(pid)
            .collection("days");

        this.addDaysListener(ref);
        this.setState({ pid, ref });
    }

    deleteDay = (did) => {
        const { ref } = this.state;
        const { showEvent } = this.context;
        showEvent(<p>Deleting day</p>);
        ref.doc(did)
            .delete()
            .then(() => showEvent(<p>Day deleted</p>))
            .catch((err) => {
                console.error(err);
                showEvent(<p>Error deleting day</p>);
            });
    };

    createNewDay = () => {
        const pid = Router.query.pid.split("_id")[1];
        const { days, ref } = this.state;
        const { showEvent } = this.context;
        const daysCount = days.length + 1;
        const day = dayInit(daysCount);
        showEvent(<p>Creating new day</p>);
        ref.doc(day._id)
            .set(day, { merge: true })
            .then(() => {
                return firebaseClient()
                    .db.collection("program")
                    .doc(pid)
                    .set(
                        { daysCount, weeksCount: Math.ceil(daysCount / 7) },
                        { merge: true },
                    );
            })
            .then(() => showEvent(<p>New Day Created</p>))
            .catch((err) => {
                console.error(err);
                showEvent(<p>Error Creating new day</p>);
            });
    };

    render() {
        const { days, did } = this.state;
        return (
            <ProgramDays
                did={did}
                days={days}
                createNewDay={this.createNewDay}
                deleteDay={this.deleteDay}
                setDid={(did) => this.setState({ did })}
            />
        );
    }

    addDaysListener = (ref) => {
        let { did } = this.state;
        let removeDaysListener = ref.orderBy("order").onSnapshot((snap) => {
            let days = [];
            snap.forEach((doc) => {
                days.push(doc.data());
            });

            if (!did) {
                did = days.length > 0 ? days[0]._id : null;
                this.setState({ days, did });
            } else {
                this.setState({ days });
            }
        });
        this.setState({ removeDaysListener });
    };

    componentWillUnmount() {
        if (this.state.removeDaysListener) {
            this.state.removeDaysListener();
        }
    }
}
