import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import { firebaseClient } from "../../utils/firebaseClient";
import Router from "next/router";
import WorkoutPage from "../../components/user/pid";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const pid = Router.query.pid.split("_id")[1];
        const ref = firebaseClient().db.collection("program").doc(pid);
        this.setState({ ref });
        this.addMyProgramsListener();
    }

    addMyProgramsListener = () => {
        const { profile } = this.context;
        const pid = Router.query.pid.split("_id")[1];
        const removeMyProgramsListener = firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .doc(pid)
            .onSnapshot((doc) => {
                this.setState({ myProgram: doc.data() });
                this.getProgram();
            });
        this.setState({ removeMyProgramsListener });
    };

    updateMyProgram = (update) => {
        const { profile } = this.context;
        const pid = Router.query.pid.split("_id")[1];
        firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .doc(pid)
            .set(update, { merge: true });
    };

    getProgram = () => {
        const { ref } = this.state;

        ref.get().then((doc) => {
            this.setState({ program: doc.data() });
        });

        ref.collection("days")
            .orderBy("order")
            .get()
            .then((docs) => {
                let days = [];
                docs.forEach((doc) => days.push(doc.data()));
                this.setState({ days: [...days] });
            });
    };

    getRoutines = (did) => {
        const { ref } = this.state;

        ref.collection("days")
            .doc(did)
            .collection("routines")
            .get()
            .then((docs) => {
                let routines = [];
                docs.forEach((doc) => routines.push(doc.data()));
                this.setState({ routines });
            });
    };

    componentWillUnmount() {
        if (this.state.removeMyProgramsListener) {
            this.state.removeMyProgramsListener();
        }
    }

    render() {
        const { days, myProgram, program, routines } = this.state;
        const { displayName } = this.context.profile;
        if (!days) return null;
        let weeks = [];
        const days_copy = [...days];
        while (days_copy.length > 0) {
            weeks.push(days_copy.splice(0, 7));
        }
        return (
            <WorkoutPage
                updateMyProgram={this.updateMyProgram}
                displayName={displayName}
                weeks={weeks}
                myProgram={myProgram}
                program={program}
                getRoutines={this.getRoutines}
                routines={routines}
            />
        );
    }
}
