import { useState, Fragment, useEffect } from "react";
import RoutineForm from "./routine-form";

export default ({
    routines,
    createNewRoutine,
    deleteRoutine,
    updateRoutine,
    setRestDay,
    restDay,
}) => {
    const [index, setIndex] = useState(0);
    const [routine, setRoutine] = useState(
        routines && routines.length && routines[index],
    );

    useEffect(() => {
        setRoutine(routines && routines.length && routines[index]);
    }, [index, routines]);

    if (!Boolean(routine)) {
        return <p className="title title--sm">Loading routines</p>;
    }

    if (routines === "no routines") {
        return (
            <div className="days__no-routines text-center">
                {restDay ? (
                    <Fragment>
                        <p className="title title--md text-secondary mb-3">
                            This day is set as a resting day
                        </p>
                        <p className="mb-3">
                            <span className="d-block mb-1">
                                If you want to add routines to this day,
                            </span>
                            <span className="d-block mb-1">
                                you need to first change it from a resting day
                            </span>
                            <button
                                onClick={() => setRestDay(false)}
                                className="btn btn__link btn__link--secondary"
                            >
                                here
                            </button>
                        </p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="title title--md text-secondary mb-3">
                            This day has no routines added to it yet
                        </p>
                        <p className="mb-3">
                            To set this as a resting day
                            <button
                                onClick={() => setRestDay(true)}
                                className="btn btn__link btn__link--secondary ml-1"
                            >
                                click here
                            </button>
                        </p>

                        <p className="mb-3">Or</p>

                        <p className="mb-1">
                            You can start adding routines for this day
                        </p>
                        <button
                            className="day-edit-routine-step__item btn day-edit-routine-step__add"
                            onClick={() => createNewRoutine(1)}
                        >
                            Add Routine
                        </button>
                    </Fragment>
                )}
            </div>
        );
    }

    let start = 0;
    const rl = routines.length;
    const ids = routines.map((r) => r._id);

    if (index <= 3) {
        start = start;
    } else if (rl - index <= 3) {
        start = rl - 5;
    } else {
        start = index - 3;
    }

    return (
        <div>
            <ul className="day-edit-routine-step__container mb-3">
                {routines.slice(start, start + 5).map((r) => {
                    return (
                        <li
                            key={r._id}
                            onClick={() => setIndex(ids.indexOf(r._id))}
                            className={`day-edit-routine-step__item btn--primary btn btn--sm ${
                                r._id === routine._id &&
                                "day-edit-routine-step__item--visited"
                            }`}
                        >
                            <p className="mu">
                                {r.name || `Routine ${r.order}`}
                            </p>
                        </li>
                    );
                })}

                <button
                    className="btn btn--sm day-edit-routine-step__item--visited"
                    onClick={() => createNewRoutine(rl + 1)}
                >
                    Add Routine
                </button>
            </ul>

            {Boolean(routine) && (
                <RoutineForm
                    routine={routine}
                    deleteRoutine={() => deleteRoutine(routine._id)}
                    onRoutinePublish={(routine) => updateRoutine(routine)}
                />
            )}
        </div>
    );
};
