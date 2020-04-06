import React, { Component } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import { routineInit } from "../../../utils/init";
import Routines from "../../../components/admin/programs/days/routines";
import Router from "next/router";
import AppContext from "../../../context/AppContext";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const pid = Router.query.pid.split("_id")[1];
        const ref = firebaseClient()
            .db.collection("program")
            .doc(pid)
            .collection("days");

        firebaseClient()
            .db.collection("program")
            .doc(pid)
            .onSnapshot((doc) => {
                this.setState({ program: doc.data() });
            });

        this.addRoutinesListener(ref);
        this.setState({ ref, did: this.props.did });
    }

    static getDerivedStateFromProps(props, state) {
        let newSate = {};
        if (props.did !== state.did) {
            newSate["updateRoutines"] = true;
        }
        return newSate;
    }

    componentDidUpdate() {
        const { updateRoutines, ref } = this.state;
        if (updateRoutines) {
            this.addRoutinesListener(ref);
            this.setState({ did: this.props.did, updateRoutines: false });
        }
    }

    render() {
        const { rid } = this.state;
        return (
            <Routines
                rid={rid}
                routines={this.state.routines}
                createNewRoutine={this.createNewRoutine}
                setRid={(rid) => this.setState({ rid })}
                deleteRoutine={this.deleteRoutine}
                updateRoutine={(r) => this.updateRoutine(r)}
            />
        );
    }

    updateRoutine = (routine) => {
        const { ref } = this.state;
        const { showEvent } = this.context;
        showEvent(<p>saving changes</p>);
        ref.doc(this.props.did)
            .collection("routines")
            .doc(routine._id)
            .set(routine, { merge: true })
            .then(() => showEvent(<p>Routine updated successfully</p>))
            .catch((err) => {
                console.error(err);
                showEvent(<p>Error updating routine</p>);
            });
    };

    deleteRoutine = (rid) => {
        const pid = Router.query.pid.split("_id")[1];
        const { ref, program } = this.state;
        const { showEvent } = this.context;
        showEvent(<p>Deleting routine</p>);
        ref.doc(this.props.did)
            .collection("routines")
            .doc(rid)
            .delete()
            .then(() => {
                return firebaseClient()
                    .db.collection("program")
                    .doc(pid)
                    .set(
                        { routinesCount: program.routinesCount - 1 },
                        { merge: true },
                    );
            })
            .then(() => showEvent(<p>Routine deleted successfully</p>))
            .catch((err) => {
                console.error(err);
                showEvent(<p>Error deleting routine</p>);
            });
    };

    addRoutinesListener = (ref) => {
        if (this.state.removeRoutinesListener) {
            this.state.removeRoutinesListener();
        }

        let removeRoutinesListener = ref
            .doc(this.props.did)
            .collection("routines")
            .orderBy("order")
            .onSnapshot((snap) => {
                let routines = [];
                snap.forEach((doc) => {
                    routines.push(doc.data());
                });

                this.setState({
                    routines: routines.length > 0 ? routines : "no routines",
                });
            });

        this.setState({ removeRoutinesListener });
    };

    createNewRoutine = (order) => {
        const pid = Router.query.pid.split("_id")[1];
        const { showEvent } = this.context;
        showEvent(<p>Creating new routine</p>);

        const { ref, did } = this.state;
        const routine = routineInit(order);
        ref.doc(did)
            .collection("routines")
            .doc(routine._id)
            .set(routine)
            .then(() => {
                return firebaseClient()
                    .db.collection("program")
                    .doc(pid)
                    .set(
                        { routinesCount: this.state.program.routinesCount + 1 },
                        { merge: true },
                    );
            })
            .then(() => {
                return ref
                    .doc(did)
                    .set({ routinesCount: order }, { merge: true });
            })
            .then(() => showEvent(<p>New routine Created</p>))
            .catch((err) => {
                console.error(err);
                showEvent(<p>Error creating routine</p>);
            });
    };
}
