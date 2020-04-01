import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Input from "../../../../components/forms/Input";

const FeaturesForm = ({ features, onNewFeature }) => {
    const [value, setValue] = useState("");

    return (
        <Fragment>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!Boolean(value.trim())) return;
                    onNewFeature([...features, value]);
                    setValue("");
                }}
                style={{ display: "flex" }}
            >
                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="newFeature">
                            <span className="mb-sm d-block text-black">
                                Add new Features *
                            </span>
                            <small className="font-smaller">
                                Add list of features associated with this price
                                plan
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <div className="d-flex">
                            <Input
                                inputId="newFeature"
                                initialValue={value}
                                onInputChange={value => setValue(value)}
                                minLength={3}
                                placeholder="new feature.."
                            />
                            <button className="btn ml-1" type="submit">
                                add
                            </button>
                        </div>
                        <ul className="features">
                            {features.map((item, index) => {
                                return (
                                    <li className="features__item" key={index}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

FeaturesForm.propTypes = {
    features: PropTypes.array.isRequired,
    onNewFeature: PropTypes.func.isRequired,
};

export default FeaturesForm;
