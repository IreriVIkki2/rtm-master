import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Input from "../../../forms/Input";
import QuillForm from "../../../forms/QuillForm";

const ProgramSalesForm = ({ sales, handleSubmit }) => {
    const init = {
        callToAction: "",
        article: "",
    };
    const [info, setInfo] = useState(sales ? sales : init);

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
                                onInputChange={callToAction =>
                                    setInfo({ ...sales, callToAction })
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
                                onInputChange={article =>
                                    setInfo({ ...sales, article })
                                }
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--input-container">
                            <button
                                className="btn btn--tertiary"
                                onClick={() => handleSubmit(info)}
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

ProgramSalesForm.propTypes = {
    sales: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
};

export default ProgramSalesForm;
