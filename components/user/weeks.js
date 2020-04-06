import { Fragment } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";

const Weeks = ({ weeks, getRoutines }) => {
    return (
        <div id="weeks-container">
            {weeks.map((week, index) => (
                <div key={index} className="uw__week">
                    <input
                        type="checkbox"
                        id={`uw__week${index}`}
                        className="uw__week--checkbox"
                    />

                    <label
                        htmlFor={`uw__week${index}`}
                        className="uw__week--label"
                    >
                        <p className="title--md">Week {index + 1}</p>
                        <span className="uw__week--label-minus">
                            <AiOutlineMinus />
                        </span>
                        <span className="uw__week--label-plus">
                            <IoIosAdd />
                        </span>
                    </label>

                    <ul className="uw__week--days">
                        {week.map((day) => (
                            <li
                                key={day._id}
                                className="uw__week--day"
                                onClick={() => getRoutines(day._id)}
                            >
                                <p className="title-md">Day {day.order}</p>
                                <p className="">{day.routinesCount} routines</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Weeks;
