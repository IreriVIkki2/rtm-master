import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

export default ({ routine, showRoutines, cd, cr, saveProgress }) => {
    if (!routine) return null;
    const [seconds, setSeconds] = useState(routine.lengthInSecs);
    const [videoWidth, setVideoWidth] = useState("100%");
    const [videoHeight, setVideoHeight] = useState("100%");

    const countdown = (secs) => {
        let timerId = setInterval(() => {
            if (seconds == 0) {
                setSeconds("done!");
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
        <div className="uw__routine">
            <p
                onClick={showRoutines}
                className="title--md d-flex mb-3 btn btn--sm btn__link btn__link--primary"
            >
                <span className="mr-2 title--md-icon">
                    <AiOutlineLeft />
                </span>
                <span>{`Day ${cd} exercise ${cr}`}</span>
            </p>

            <p className="title title--md text-primary mb-2">{routine.name}</p>

            <div className="mb-2">
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

            <p className="mb-2">{routine.description}</p>

            {routine.lengthInSecs === 0 ? (
                <div className="d-flex text-center">
                    <p className="title title--md mr-2">
                        repeat {routine.repeatCount}
                    </p>
                    <button
                        onClick={() => saveProgress(routine._id)}
                        className="btn btn--sm btn--secondary"
                    >
                        done!
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <button
                        onClick={
                            seconds === "done"
                                ? () => saveProgress(routine._id)
                                : () => countdown()
                        }
                        className="btn btn--sm btn--secondary"
                    >
                        {seconds}
                    </button>
                </div>
            )}
        </div>
    );
};
