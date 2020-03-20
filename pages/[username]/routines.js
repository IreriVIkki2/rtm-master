import React, { Component, Fragment } from "react";
import Routine from "./routine";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routineIndex: 0,
            finished: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newState = null;

        const { routines, routineProgress } = props;

        if (routines) {
            let routine = null;
            if (routines.length === 0) {
                routine = "No routines today";
            } else {
                routine = routines[state.routineIndex];
            }
            newState = { ...state, routines, routine, routineProgress };
        }

        return newState;
    }

    showNext = () => {
        console.log("next");
        const { routineIndex, routines } = this.state;

        if (routineIndex + 1 > routines.length) {
            this.setState({ finished: true });
        } else {
            this.setState({ routineIndex: routineIndex + 1 });
        }
    };

    render() {
        const {
            routines,
            routine,
            routineIndex,
            finished,
            routineProgress,
        } = this.state;

        if (!routines) return <p className="title title--sm">loading...</p>;

        if (finished)
            return (
                <div className="">
                    <p className="title title--md">Finished</p>
                </div>
            );

        return (
            <div className="user-workout__routines">
                <div className="user-workout__routines-nav">
                    {routines.map((routine, index) => {
                        return (
                            <div
                                key={routine._id}
                                onClick={() => {
                                    this.setState({
                                        routine,
                                        routineIndex: index,
                                    });
                                }}
                                className={`mb-3 ${routineIndex === index &&
                                    "text-secondary"}`}
                            >
                                <p>
                                    <span className="title">
                                        {routine.name}
                                    </span>
                                    <small>
                                        {routine.lengthInSecs > 0
                                            ? routine.lengthInSecs + " s"
                                            : routine.repeatCount}
                                    </small>
                                </p>
                            </div>
                        );
                    })}
                </div>

                <Routine
                    routine={routine}
                    onNext={this.props.onNext}
                    showNext={this.showNext}
                />
            </div>
        );
    }
}
