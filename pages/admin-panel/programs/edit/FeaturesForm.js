import React, { useState } from "react";
import PropTypes from "prop-types";

const FeaturesForm = ({ features, onNewFeature }) => {
    const [value, setValue] = useState("");

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!Boolean(value.trim())) return;
                    onNewFeature([...features, value]);
                    setValue("");
                }}
                style={{ display: "flex" }}
            >
                <div>
                    <label htmlFor="newFeature">New feature</label>
                    <input
                        id="newFeature"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text"
                    />
                </div>

                <button type="submit">add</button>
            </form>

            <ul>
                {features.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })}
            </ul>
        </div>
    );
};

FeaturesForm.propTypes = {
    features: PropTypes.array.isRequired,
    onNewFeature: PropTypes.func.isRequired,
};

export default FeaturesForm;
