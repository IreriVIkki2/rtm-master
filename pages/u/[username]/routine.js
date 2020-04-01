import React, { useState } from "react";
import PropTypes from "prop-types";

const Routine = ({ routine, onNext, showNext }) => {
    if (!routine) {
        return (
            <h1 className="mt-7 title title--sm text-secondary">Loading...</h1>
        );
    }

    if (typeof routine === "string") {
        return (
            <h1 className="mt-7 title title--sm text-secondary">{routine}</h1>
        );
    }

    const [seconds, setSeconds] = useState(routine.lengthInSecs);
    const [videoWidth, setVideoWidth] = useState("100%");
    const [videoHeight, setVideoHeight] = useState("100%");

    const countdown = secs => {
        let timerId = setInterval(() => {
            if (seconds == 0) {
                setSeconds("complete");
                clearInterval(timerId);
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
    };

    const url = routine.youtubeUrl.replace("watch?v=", "embed/");

    const setVideoDimensions = () => {
        const width = document.getElementById(routine._id).clientWidth;
        const height = Math.floor(width / 1.8);
        setVideoWidth(`${width}px`);
        setVideoHeight(`${height}px`);
    };

    return (
        <div className="user-workout__routine">
            <div className="user-workout__routine-video-container">
                <iframe
                    onLoad={setVideoDimensions}
                    id={routine._id}
                    width={videoWidth}
                    height={videoHeight}
                    src={url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                ></iframe>
            </div>
            <div className="user-workout__routine-info">
                <p className="">{routine.description}</p>

                <div className="">
                    {routine.lengthInSecs > 0 ? (
                        <p className="">{seconds}</p>
                    ) : (
                        <p className="">{routine.repeatCount}</p>
                    )}
                    <button
                        className="btn btn--primary"
                        onClick={() => countdown(routine.lengthInSecs)}
                    >
                        start
                    </button>
                    <button
                        onClick={() => {
                            onNext({
                                routineId: routine._id,
                                routine: routine.name,
                                routineOrder: routine.order,
                            });
                            showNext();
                        }}
                        className="btn btn--secondary"
                    >
                        next
                    </button>
                </div>
            </div>
        </div>
    );
};

Routine.propTypes = {};

export default Routine;
