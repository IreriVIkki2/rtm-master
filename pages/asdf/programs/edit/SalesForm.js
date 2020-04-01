import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Input from "../../../../components/forms/Input";
import QuillForm from "../../../../components/forms/QuillForm";

const SalesForm = ({ sales, handleSubmit }) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        setInfo(sales);
        return () => {};
    }, [sales]);

    if (!info) return null;

    return (
        <Fragment>
            <p className="title title--md text-black mb-1">
                Edit sales information
            </p>
            <p className="mb-3">
                This is the information that will be seen by those who have not
                purchased the program yet
                <br />
                All fields in this section are required
            </p>

            {info && (
                <div className="form__container">
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="salesCallToAction">
                                <span className="mb-sm d-block text-black">
                                    Call to action text *
                                </span>
                                <small className="font-smaller">
                                    This is two or three word message that will
                                    be displayed on the main call to action
                                    button prompting a user to buy the program
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <Input
                                inputId="salesCallToAction"
                                initialValue={info.callToAction}
                                onInputChange={value =>
                                    setInfo({
                                        ...sales,
                                        callToAction: value,
                                    })
                                }
                                minLength={3}
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="programTitle">
                                <span className="mb-sm d-block text-black">
                                    Sales Article *
                                </span>
                                <small className="font-smaller">
                                    Add a very descriptive article selling the
                                    program.
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <QuillForm
                                initialValue={info.article}
                                onInputChange={value =>
                                    setInfo({ ...sales, article: value })
                                }
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--input-container">
                            <button
                                className="btn btn--tertiary"
                                onClick={() => handleSubmit({ sales: info })}
                            >
                                save and continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

SalesForm.propTypes = {
    sales: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
};

export default SalesForm;
