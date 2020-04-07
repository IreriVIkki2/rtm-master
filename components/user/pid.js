import { useState, Fragment } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import Weeks from "./weeks";
import Routine from "./routine";

export default ({
    cw,
    cd,
    weeks,
    myProgram,
    program,
    routines,
    getRoutines,
    displayName,
    saveProgress,
}) => {
    const showRoutines = () => {
        const el = document.getElementById("uw__main--content");
        el.style.left = "-100%";
    };

    const showRoutine = () => {
        const el = document.getElementById("uw__main--content");
        el.style.left = "-200%";
    };

    const showWeeks = () => {
        const el = document.getElementById("uw__main--content");
        el.style.left = "0%";
    };

    const size = () => {
        const umc = document.getElementById("uw__main--content");
        const um = document.getElementById("uw__main");
        if (um && umc) {
            um.style.height = `${umc.clientHeight + 100}px`;
        }
    };

    const [currentRoutine, setCurrentRoutine] = useState(null);
    const [cr, setCr] = useState(0);

    return (
        <div className="uw" onLoad={size} onTransitionEnd={size}>
            <header className="uw__header">
                <img src={program.banner} alt="" />
                <div className="uw__header--content">
                    <p className="title--md d-flex mb-2">
                        <span className="d-block">Welcome Back</span>
                        <span className="d-block ml-1 bolder text-secondary">
                            {displayName}!
                        </span>
                    </p>
                    <p className="title--md mb-3">{program.title}</p>
                    <p className="title title--md mb-2 text-secondary">
                        {myProgram.progress}% Complete
                    </p>
                </div>
            </header>

            <div className="uw__main" id="uw__main">
                <div className="uw__main--content" id="uw__main--content">
                    <div
                        className="uw__weeks uw__main--weeks"
                        id="uw__main--weeks"
                    >
                        <Weeks
                            currentWeek={myProgram.currentWeek || 1}
                            weeks={weeks}
                            getRoutines={(did) => {
                                getRoutines(did);
                                showRoutines();
                            }}
                        />
                    </div>

                    <ul className="uw__main--routines" id="uw__main--routines">
                        <div>
                            <p
                                onClick={showWeeks}
                                className="title--md d-flex btn btn--sm btn__link btn__link--primary"
                            >
                                <span className="mr-2 title--md-icon">
                                    <AiOutlineLeft />
                                </span>
                                <span>
                                    {routines === "fetching"
                                        ? "wait..."
                                        : ` Week ${cw} Day ${cd}`}
                                </span>
                            </p>
                            {routines &&
                                routines !== "fetching" &&
                                routines.map((routine, i) => {
                                    return (
                                        <li
                                            key={routine._id}
                                            className="uw__routine--nav-item title"
                                            onClick={() => {
                                                setCurrentRoutine(routine);
                                                setCr(i + 1);
                                                showRoutine();
                                            }}
                                        >
                                            <span>
                                                {routine.name ||
                                                    `Routine ${i + 1}`}
                                            </span>
                                            <span className="ml-auto mr-3">
                                                {routine.lengthInSeconds > 0
                                                    ? routine.lengthInSeconds
                                                    : routine.repeatCount}
                                            </span>
                                        </li>
                                    );
                                })}
                        </div>
                    </ul>

                    <div className="uw__main--routine" id="uw__main--routine">
                        <Routine
                            routine={currentRoutine}
                            showRoutines={showRoutines}
                            cd={cd}
                            cr={cr}
                            saveProgress={(rid) => {
                                saveProgress({ cd, cr, cw, rid });
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
