import React, { Component, Fragment } from "react";
import Routine from "./routine";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        let newState = null;

        const { routines } = props;

        if (routines) {
            let routine = null;
            if (routines.length === 0) {
                routine = "No routines today";
            } else {
                routine = routines[0];
            }
            newState = { routines, routine };
        }

        return newState;
    }

    render() {
        const { routines, routine, currentId } = this.state;

        if (!routines) return <p className="title title--sm">loading...</p>;
        return (
            <div className="user-workout__routines">
                <div className="user-workout__routines-nav">
                    {routines.map(routine => {
                        return (
                            <p
                                key={routine._id}
                                onClick={() => {
                                    this.setState({
                                        currentId: routine._id,
                                        routine,
                                    });
                                }}
                                className="mb-3"
                            >
                                <p className="title">{routine.name}</p>
                                <small>
                                    {routine.lengthInSecs > 0
                                        ? routine.lengthInSecs + " s"
                                        : routine.repeatCount}
                                </small>
                            </p>
                        );
                    })}
                </div>

                <Routine routine={routine} />
            </div>
        );
    }
}
