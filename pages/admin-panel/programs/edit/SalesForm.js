import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./forms/Input";
import QuillForm from "./forms/QuillForm";

const SalesForm = ({ sales, handleSubmit }) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        setInfo(sales);
        return () => {};
    }, [sales]);

    return (
        <div>
            <h1>Edit sales information</h1>
            <p>
                This is the information that will be seen by those who have not
                purchased the program yet
            </p>

            {info && (
                <div>
                    <p>the forms will come in here</p>
                    <div>
                        <div>
                            <label htmlFor="salesCallToAction">
                                Call to action text
                            </label>
                        </div>
                        <Input
                            inputId="salesCallToAction"
                            initialValue={info.callToAction}
                            onInputChange={value =>
                                setInfo({ ...sales, callToAction: value })
                            }
                            minLength={3}
                        />
                        <QuillForm
                            initialValue={info.article}
                            onInputChange={value =>
                                setInfo({ ...sales, article: value })
                            }
                        />
                        <button onClick={() => handleSubmit({ sales: info })}>
                            save and continue
                        </button>
                    </div>
                    <div>
                        <h3>Json Object</h3>
                        <pre>{JSON.stringify(info, undefined, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

SalesForm.propTypes = {
    sales: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
};

export default SalesForm;
