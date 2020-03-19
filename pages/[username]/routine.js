import React, { useState } from "react";
import PropTypes from "prop-types";

const Routine = ({ routine }) => {
    if (!routine._id)
        return (
            <h1 className="mt-7 title title--lg text-secondary">No routine</h1>
        );

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

    console.log(routine.youtubeUrl);
    const url = routine.youtubeUrl.replace("watch?v=", "embed/");
    console.log("Routine -> url", url);

    const setVideoDimensions = () => {
        const width = document.getElementById(routine._id).clientWidth;
        const height = Math.floor(width / 1.8);
        setVideoWidth(`${width}px`);
        setVideoHeight(`${height}px`);
        console.log("setVideoDimensions -> width", width, height);
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
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen={true}
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
                    <button className="btn btn--secondary">next</button>
                </div>
            </div>
        </div>
    );
};

Routine.propTypes = {};

export default Routine;
