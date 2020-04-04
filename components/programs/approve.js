import React from "react";

export default ({ cancelPayment, approvePayment, program, amount }) => {
    return (
        <div className="pt-7 confirm">
            <div className="">
                <p className="mb-1">
                    <span className="title title--lg d-block mb-1">
                        Complete Payment
                    </span>
                    <span className="d-block title--md text-secondary">
                        {program.title}
                    </span>
                </p>
                <p className="mb-3">{program.description}</p>

                <p className="d-flex title--md">
                    <span className="mr-1">confirm payment of</span>
                    <span className="">{amount}</span>
                </p>
            </div>
            <div className="pt-7 mb-7 d-flex">
                <button
                    onClick={cancelPayment}
                    className="btn btn--tertiary mr-3"
                >
                    cancel payment
                </button>
                <button onClick={approvePayment} className="btn btn--secondary">
                    confirm payment
                </button>
            </div>
        </div>
    );
};
