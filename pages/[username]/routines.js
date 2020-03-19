import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Routine from "./routine";

const Routines = ({ routines, onCompletion }) => {
    const [currentId, setCurrentId] = useState(
        routines.length > 0 && routines[0]._id,
    );
    const [routine, setRoutine] = useState(routines[0]);

    const handleNextClick = rid => {
        const routine = {};
        return onCompletion();
    };

    if (!routines) return <p className="title title--sm">loading...</p>;

    if (routines.length == 0)
        return (
            <p className="title title--lg text-secondary">This is a rest day</p>
        );

    return (
        <Fragment>
            {routines.length &&
                routines.map(routine => {
                    return (
                        <p
                            key={routine._id}
                            onClick={() => {
                                setCurrentId(routine._id);
                                setRoutine(routine);
                            }}
                            className="title title--md mb-3"
                        >
                            {routine.name}
                        </p>
                    );
                })}

            {<Routine routine={routine} />}
        </Fragment>
    );
};

Routines.propTypes = {};

export default Routines;
