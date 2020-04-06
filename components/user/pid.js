import { useEffect } from "react";
import Weeks from "./weeks";
import { AiOutlineLeft } from "react-icons/ai";

export default ({
    weeks,
    myProgram,
    program,
    routines,
    getRoutines,
    displayName,
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

    return (
        <div className="uw" onLoad={size} onTransitionEnd={size}>
            <header className="uw__header">
                <img src={program.banner} alt="" />
                <div className="uw__header--content">
                    <p className="title title--md">
                        <span className="d-block mb-1">Welcome back</span>
                        <span className="d-block mb-2">{displayName}</span>
                    </p>
                    <p className="title--md mb-3">{program.title}</p>
                </div>
            </header>

            <div className="uw__main" id="uw__main">
                <div className="uw__main--content" id="uw__main--content">
                    <div
                        className="uw__weeks uw__main--weeks"
                        id="uw__main--weeks"
                    >
                        <Weeks
                            weeks={weeks}
                            getRoutines={(did) => {
                                getRoutines(did);
                                showRoutines();
                            }}
                        />
                    </div>

                    <ul
                        className="uw__routines uw__main--routines"
                        id="uw__main--routines"
                    >
                        <div>
                            <div>
                                <p className="">
                                    <span onClick={showWeeks} className="mr-2">
                                        <AiOutlineLeft />
                                    </span>
                                    <span>Week 1 Day 2</span>
                                </p>
                            </div>
                            {routines &&
                                routines.map((routine) => {
                                    return (
                                        <li
                                            key={routine._id}
                                            className=""
                                            onClick={showRoutine}
                                        >
                                            <p className="title">
                                                {routine.name}
                                            </p>
                                        </li>
                                    );
                                })}
                        </div>
                    </ul>

                    <div
                        className="uw__routine uw__main--routine"
                        id="uw__main--routine"
                    >
                        <div>
                            <p className="">
                                <span onClick={showRoutines} className="mr-2">
                                    <AiOutlineLeft />
                                </span>
                                <span>Day 2 Routine 1</span>
                            </p>
                            <div>
                                This is th routine Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit. Vero reiciendis
                                molestias officiis nam perferendis aut nemo
                                blanditiis voluptatibus voluptatum unde
                                similique, illum soluta vel sit tempore
                                voluptates magnam. Iste, eligendi.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
