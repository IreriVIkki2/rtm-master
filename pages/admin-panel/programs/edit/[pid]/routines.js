import React, { Component } from "react";
import firebaseCRUD from "../../../../../utils/firebaseCRUD";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import Router from "next/router";
import Routine from "./routine";
import Link from "next/link";
// import querystring from "querystring";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routines: [],
            routine: null,
            routineId: null,
            checkedIndex: 1,
            unsubscribeRoutinesListener: null,
            updateRoutines: false,
            dayId: this.props.dayId,
        };

        this.handleNewRoutineCreate = this.handleNewRoutineCreate.bind(this);
        this.addRoutinesListener = this.addRoutinesListener.bind(this);
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
                this.setState({ routineId, checkedIndex: order });
            })
            .catch(err => console.error(err));
    }

    handleRoutineChange(routineId, index) {
        this.updateCurrentRoutine(routineId);
        this.setState({ routineId, checkedIndex: index });
    }

    handleRoutinePublish(routine) {
        firebaseClient()
            .db.collection("routines")
            .doc(routine._id)
            .set(routine);

        this.setState({ checkedIndex: checkedIndex + 1 });
    }

    render() {
        const { routines, routine, checkedIndex } = this.state;
        const { day } = this.props;

        let start = 0;
        const rl = routines.length;

        if (checkedIndex <= 3) {
            start = start;
        } else if (rl - checkedIndex <= 2) {
            start = rl - 5;
        } else {
            start = checkedIndex - 3;
        }

        return (
            <div>
                <div className="mb-3 d-flex">
                    <Link
                        href="/admin-panel/programs/edit/[pid]"
                        as={`/admin-panel/programs/edit/${Router.query.pid}`}
                    >
                        <a className="title btn__link btn__link--secondary d-flex mr-3">
                            <span className="mr-1">&#8592;</span>
                            Edit Program
                        </a>
                    </Link>
                    <p className="title title--md text-black mr-2">
                        Day {day.order}:
                    </p>

                    <p className="title title--md text-secondary">
                        {rl} Routines
                    </p>
                </div>

                <ul className="day-edit-routine-step__container mb-3">
                    {routines.slice(start, start + 5).map(routine => {
                        return (
                            <li
                                onClick={() =>
                                    this.handleRoutineChange(
                                        routine._id,
                                        routine.order,
                                    )
                                }
                                key={routine._id}
                                className={`day-edit-routine-step__item btn ${checkedIndex ==
                                    routine.order &&
                                    "day-edit-routine-step__item--visited"}`}
                            >
                                <p className="mu">Routine {routine.order}</p>
                            </li>
                        );
                    })}
                    <button
                        className="day-edit-routine-step__item btn day-edit-routine-step__add"
                        onClick={this.handleNewRoutineCreate}
                    >
                        Add Routine
                    </button>
                </ul>
                {routine ? (
                    <Routine
                        routine={routines[checkedIndex - 1]}
                        onRoutinePublish={this.handleRoutinePublish}
                    />
                ) : (
                    <h4 className="title title--md text--secondary">
                        No routines added yet
                    </h4>
                )}
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
