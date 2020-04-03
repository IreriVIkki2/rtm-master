import React from "react";

function PayUP({ main, plans }) {
    return (
        <div className="pt-7">
            <h1 className="title title--ls">Pay Up sucker</h1>
            <pre>{JSON.stringify({ main, plans }, undefined, 2)}</pre>
        </div>
    );
}

export default PayUP;
