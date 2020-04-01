import React, { Component, Fragment } from "react";
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
            day: this.props.day,
            routines: [],
            routine: null,
            routineId: null,
            checkedIndex: 1,
            unsubscribeRoutinesListener: null,
            updateRoutines: false,
            dayId: this.props.dayId,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.day._id !== state.day._id) {
            return { day: props.day, dayId: props.dayId, refresh: true };
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.addRoutinesListener();
        this.addDayListener();
    }

    componentDidUpdate() {
        if (this.state.refresh) {
            this.addRoutinesListener();
            this.addDayListener();
            this.setState({ refresh: false });
        }
    }

    updateCurrentRoutine = routineId => {
        const routine = this.state.routines.find(
            routine => routine._id === routineId,
        );

        this.setState({ routine });
    };

    handleNewRoutineCreate = async () => {
        const { query } = Router;
        const { routines } = this.state;
        const order = routines.length + 1;
        await firebaseCRUD
            .createNewRoutine(query.pid, this.props.dayId, order)
            .then(routineId => {
                this.setState({ routineId, checkedIndex: order });
            })
            .catch(err => console.error(err));
    };

    handleRoutineChange = (routineId, index) => {
        this.updateCurrentRoutine(routineId);
        this.setState({ routineId, checkedIndex: index });
    };

    toggleRestDay = () => {
        const { day, dayId } = this.state;
        firebaseClient()
            .db.collection("days")
            .doc(dayId)
            .update({
                ...day,
                updatedAt: Date.now(),
                isRestDay: !day.isRestDay,
            });
    };

    handleRoutinePublish = routine => {
        firebaseClient()
            .db.collection("routines")
            .doc(routine._id)
            .set(routine);

        firebaseClient()
            .db.collection("days")
            .doc(this.state.dayId)
            .update({
                ...this.state.day,
                updatedAt: Date.now(),
                routinesCount: this.state.routines.length,
            });

        window.scrollTo(0, 0);
    };

    render() {
        const { routines, routine, checkedIndex, day } = this.state;

        let start = 0;
        const rl = routines.length;

        if (checkedIndex <= 3) {
            start = start;
        } else if (rl - checkedIndex <= 2) {
            start = rl - 5;
        } else {
            start = checkedIndex - 3;
        }

        const dayRoutines = (
            <Fragment>
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
            </Fragment>
        );

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

                    <p
                        onClick={this.toggleRestDay}
                        className="ml-auto btn__link btn__link--secondary text-secondary"
                    >
                        {day.isRestDay
                            ? "set this as Workout Day"
                            : "Set this as RESTING DAY"}
                    </p>
                </div>

                {day.isRestDay ? (
                    <div>
                        <h1 className="title title--md mt-7 text-secondary">
                            You have set this day as a resting day
                        </h1>

                        <a
                            className="btn__link btn__link--secondary mt-3"
                            onClick={this.toggleRestDay}
                        >
                            Click here to set as working day
                        </a>
                    </div>
                ) : (
                    dayRoutines
                )}
            </div>
        );
    }

    componentWillUnmount() {
        if (this.state.unsubscribeRoutinesListener) {
            this.state.unsubscribeRoutinesListener();
        }
    }

    addDayListener = () => {
        if (this.state.unsubscribeDayListener) {
            this.state.unsubscribeDayListener();
        }

        const { dayId } = this.props;
        let unsubscribeDayListener = firebaseClient()
            .db.collection("days")
            .doc(this.props.dayId)
            .onSnapshot(doc => {
                this.setState({ day: doc.data() });
            });
        this.setState({ unsubscribeDayListener, dayId });
    };

    addRoutinesListener = () => {
        if (this.state.unsubscribeRoutinesListener) {
            this.state.unsubscribeRoutinesListener();
        }
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
    };
}
