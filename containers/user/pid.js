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

    getRoutines = ({ did, cw, cd }) => {
        this.setState({ routines: "fetching" });
        const { ref } = this.state;

        ref.collection("days")
            .doc(did)
            .collection("routines")
            .get()
            .then((docs) => {
                let routines = [];
                docs.forEach((doc) => routines.push(doc.data()));
                this.setState({ routines, cw, cd, did });
            });
    };

    saveProgress = ({ cd, cr, cw, rid }) => {
        const pid = Router.query.pid.split("_id")[1];
        const { profile } = this.context;
        const { program, myProgram, did, routines } = this.state;
        const days = { ...myProgram.days };
        const day = days[did];
        let routinesCompleted = myProgram.routinesCompleted + 1;
        let allRoutines = [rid];

        if (day && Array.isArray(day.routines)) {
            allRoutines = day.routines.includes(rid)
                ? day.routines
                : [...day.routines, rid];

            routinesCompleted = day.routines.includes(rid)
                ? routinesCompleted - 1
                : routinesCompleted;
        }

        const complete = cr === routines.length;
        const newComplete =
            (day && !day.complete && complete) ||
            (!day && routines.length === 1);

        days[did] = {
            ...day,
            complete,
            routines: allRoutines,
        };
        firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .doc(pid)
            .set({
                ...myProgram,
                days: {
                    ...myProgram.days,
                    ...days,
                },
                currentWeek: cw,
                currentDay: cd,
                currentRoutine: cr,
                routinesCompleted,
                daysCompleted: newComplete
                    ? myProgram.daysCompleted + 1
                    : myProgram.daysCompleted,
                progress: Math.ceil(
                    (routinesCompleted * 100) / program.routinesCount,
                ),
            });
    };

    componentWillUnmount() {
        if (this.state.removeMyProgramsListener) {
            this.state.removeMyProgramsListener();
        }
    }

    render() {
        const { days, myProgram, program, routines, cw, cd } = this.state;
        const { displayName } = this.context.profile;
        if (!days) return null;
        let weeks = [];
        const days_copy = [...days];
        while (days_copy.length > 0) {
            weeks.push(days_copy.splice(0, 7));
        }
        return (
            <WorkoutPage
                cw={cw}
                cd={cd}
                updateMyProgram={this.updateMyProgram}
                displayName={displayName}
                weeks={weeks}
                myProgram={myProgram}
                program={program}
                getRoutines={this.getRoutines}
                routines={routines}
                saveProgress={this.saveProgress}
            />
        );
    }
}
