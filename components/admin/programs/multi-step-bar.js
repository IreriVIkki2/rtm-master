import { useState } from "react";
import PropTypes from "prop-types";

const MultiStepBar = ({ onAddDaysClick, steps, tab, setTab }) => {
    return (
        <div className="program-edit">
            <div className="multi-step-bar">
                <div className="multi-step-bar__container">
                    {steps.map(i => {
                        return (
                            <div key={i.index} className="">
                                <input
                                    type="radio"
                                    id={i.index}
                                    name="progress"
                                    onChange={() => setTab(i.index)}
                                    value={i}
                                    checked={tab == i.index}
                                    className="d-none"
                                />
                                <label
                                    className={`multi-step-bar__item btn ${i.index <=
                                        tab &&
                                        "multi-step-bar__item--visited"}`}
                                    htmlFor={i.index}
                                >
                                    {i.value}
                                </label>
                            </div>
                        );
                    })}
                    <button
                        onClick={onAddDaysClick}
                        className="btn multi-step-bar__item"
                    >
                        add days
                    </button>
                </div>
            </div>
        </div>
    );
};

MultiStepBar.propTypes = {
    onAddDaysClick: PropTypes.func,
    steps: PropTypes.array.isRequired,
    tab: PropTypes.number.isRequired,
    setTab: PropTypes.func.isRequired,
};

export default MultiStepBar;
