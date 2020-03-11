import React, { Component } from "react";
import firebaseCRUD from "../../../../../utils/firebaseCRUD";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import Router from "next/router";
import Routine from "./routine";
// import querystring from "querystring";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routines: [],
            routine: null,
            routineId: null,
            unsubscribeRoutinesListener: null,
            updateRoutines: false,
            dayId: this.props.dayId,
        };

        this.handleNewRoutineCreate = this.handleNewRoutineCreate.bind(this);
        this.addRoutinesListener = this.addRoutinesListener.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
        const { dayId } = this.props;
        this.setState({ dayId });
        this.addRoutinesListener();
    }

    componentDidUpdate() {
        const { unsubscribeRoutinesListener, dayId } = this.state;
        if (dayId !== this.props.dayId) {
            if (unsubscribeRoutinesListener) {
                unsubscribeRoutinesListener();
            }
            this.addRoutinesListener();
        }
    }

    updateCurrentRoutine(routineId) {
        const routine = this.state.routines.find(
            routine => routine._id === routineId,
        );

        this.setState({ routine });
    }

    async handleNewRoutineCreate() {
        const { query } = Router;
        const { routines } = this.state;
        const order = routines.length + 1;
        await firebaseCRUD
            .createNewRoutine(query.pid, this.props.dayId, order)
            .then(routineId => {
                this.setState({ routineId });
            })
            .catch(err => console.error(err));
    }

    handleRoutineChange(routineId) {
        this.updateCurrentRoutine(routineId);
        this.setState({ routineId });
    }

    handleRoutinePublish(routine) {
        console.log("extends -> handleRoutinePublish -> routine", routine);
        firebaseClient()
            .db.collection("routines")
            .doc(routine._id)
            .set(routine);
    }

    render() {
        const { routines, routineId, routine } = this.state;
        const { day } = this.props;
        return (
            <div>
                <div>
                    <h3>Day {day.order}</h3>
                </div>

                <ul style={{ display: "flex" }}>
                    {routines.map(routine => {
                        return (
                            <li
                                onClick={() =>
                                    this.handleRoutineChange(routine._id)
                                }
                                key={routine._id}
                                style={{
                                    backgroundColor:
                                        routineId === routine._id
                                            ? "turquoise"
                                            : "",
                                }}
                            >
                                <p>Routine {routine.order}</p>
                            </li>
                        );
                    })}
                    <button onClick={this.handleNewRoutineCreate}>
                        Add Routine
                    </button>
                </ul>

                {routine ? (
                    <Routine
                        routine={routine}
                        onRoutinePublish={this.handleRoutinePublish}
                    />
                ) : (
                    <h4>No routines added yet</h4>
                )}
                <div>
                    <pre>{JSON.stringify(day, undefined, 2)}</pre>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        if (this.state.unsubscribeRoutinesListener) {
            this.state.unsubscribeRoutinesListener();
        }
    }

    addRoutinesListener() {
        const { dayId } = this.props;
        let unsubscribeRoutinesListener = firebaseClient()
            .db.collection("routines")
            .where("dayId", "==", dayId)
            .orderBy("order")
            .onSnapshot(routinesSnapshot => {
                let routines = [];
                routinesSnapshot.forEach(routine => {
                    routines.push(routine.data());
                });
                this.setState({
                    routines,
                    routineId: routines[0] && routines[0]._id,
                    routine: routines[0] && routines[0],
                });
            });
        this.setState({ unsubscribeRoutinesListener, dayId });
    }
}
