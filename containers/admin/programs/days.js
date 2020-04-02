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

    createNewDay = () => {
        const { days, ref } = this.state;
        const { showEvent } = this.context;
        const day = dayInit(days.length + 1);
        showEvent(<p>Creating new day</p>);
        ref.doc(day._id)
            .set(day, { merge: true })
            .then(() => {
                showEvent(<p>New Day Created</p>);
            })
            .catch(err => {
                console.error(err);
                showEvent(<p>Error Creating new day</p>);
            });
    };

    render() {
        const { days, did } = this.state;
        return (
            <ProgramDays
                days={days}
                createNewDay={this.createNewDay}
                did={did}
                setDid={did => this.setState({ did })}
            />
        );
    }

    addDaysListener = ref => {
        let { did } = this.state;
        let removeDaysListener = ref.orderBy("order").onSnapshot(snap => {
            let days = [];
            snap.forEach(doc => {
                days.push(doc.data());
            });

            if (did === undefined) {
                did = days.length > 0 ? days[0]._id : null;
            }
            this.setState({ days, did });
        });
        this.setState({ removeDaysListener });
    };

    componentWillUnmount() {
        if (this.state.removeDaysListener) {
            this.state.removeDaysListener();
        }
    }
}
