import { useState } from "react";
import RoutineForm from "./routine-form";

export default ({
    routines,
    createNewRoutine,
    setRid,
    deleteRoutine,
    updateRoutine,
}) => {
    const [index, setIndex] = useState(1);

    if (typeof routines === "undefined") {
        return <p className="title title--sm">Loading routines</p>;
    }

    if (routines === "no routines") {
        return (
            <div>
                <p className="title title--md text--secondary">No routines</p>
                <button
                    className="day-edit-routine-step__item btn day-edit-routine-step__add"
                    onClick={() => createNewRoutine(1)}
                >
                    Add Routine
                </button>
            </div>
        );
    }

    let start = 0;
    const rl = routines.length;
    if (index < 0 || index > rl - 1) {
        setIndex(rl - 1);
        return <p className="">Refreshing</p>;
    }
    const routine = routines[index];

    if (index <= 3) {
        start = start;
    } else if (rl - index <= 2) {
        start = rl - 5;
    } else {
        start = index - 3;
    }

    return (
        <div>
            <ul className="day-edit-routine-step__container mb-3">
                {routines.slice(start, start + 5).map((routine, i) => {
                    return (
                        <li
                            key={routine._id}
                            onClick={() => {
                                setIndex(i + 1);
                                setRid(routine._id);
                            }}
                            className={`day-edit-routine-step__item btn ${index ==
                                routine.order &&
                                "day-edit-routine-step__item--visited"}`}
                        >
                            <p className="mu">
                                {routine.name || `Routine ${i + 1}`}
                            </p>
                        </li>
                    );
                })}

                <button
                    className="day-edit-routine-step__item btn day-edit-routine-step__add"
                    onClick={() => createNewRoutine(rl + 1)}
                >
                    Add Routine
                </button>
            </ul>

            <div className="">
                <RoutineForm
                    routine={routine}
                    deleteRoutine={() => deleteRoutine(routine._id)}
                    onRoutinePublish={routine => updateRoutine(routine)}
                />
            </div>
        </div>
    );
};
