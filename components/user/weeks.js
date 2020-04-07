import { useState, useEffect } from "react";
import {
    AiOutlineMinus,
    AiOutlineCoffee,
    AiOutlineCheckCircle,
} from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";

const Weeks = ({ weeks, getRoutines, currentWeek }) => {
    const [cw, setCw] = useState(null);
    useEffect(() => {
        setCw(currentWeek);
    }, [currentWeek]);
    return (
        <div id="weeks-container">
            {weeks.map((week, index) => (
                <div key={index} className="uw__week">
                    <input
                        type="checkbox"
                        id={`uw__week${index}`}
                        className="uw__week--checkbox"
                        checked={index + 1 === cw}
                        onChange={() => setCw(index + 1)}
                    />

                    <label
                        htmlFor={`uw__week${index}`}
                        className="uw__week--label"
                    >
                        <p className="d-flex">
                            <span className="title--md mr-3">
                                Week {index + 1}
                            </span>
                            {index + 1 < currentWeek && (
                                <span className="text-secondary">
                                    <AiOutlineCheckCircle />
                                </span>
                            )}
                        </p>
                        <span className="uw__week--label-minus bolder">
                            <AiOutlineMinus />
                        </span>
                        <span className="uw__week--label-plus bolder">
                            <IoIosAdd />
                        </span>
                    </label>

                    <ul className="uw__week--days">
                        {week.map((day, i) => (
                            <li
                                key={day._id}
                                className="uw__week--day"
                                onClick={() =>
                                    getRoutines({
                                        did: day._id,
                                        cw: index + 1,
                                        cd: i + 1,
                                    })
                                }
                            >
                                <p className="title-md d-flex">
                                    <span className="">Day {i + 1}</span>
                                    {day.isRestDay && (
                                        <span className="ml-auto mr-2">
                                            <AiOutlineCoffee />
                                        </span>
                                    )}
                                </p>
                                <p className="">
                                    {day.isRestDay
                                        ? "Your body needs rest"
                                        : `${day.routinesCount} routines`}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Weeks;
