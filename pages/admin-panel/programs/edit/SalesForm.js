import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./forms/Input";

const SalesForm = ({ sales }) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        setInfo(sales);
        return () => {};
    }, [sales]);

    console.log("SalesForm -> sales", typeof info);
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
};

export default SalesForm;
