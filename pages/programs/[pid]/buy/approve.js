import React, { Component } from "react";
import Router from "next/router";
import axios from "axios";

export class Approve extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Approve -> completePayment -> Router.query", Router.query);
    }

    cancelPayment = () => {};

    completePayment = () => {
        axios
            .get("/api/approve", {
                params: { ...Router.query },
            })
            .then(res => {
                console.log("extends -> handlePay -> res", res);
                this.setState({ payment: res.data.payment });
            });
    };

    render() {
        const { payment } = this.state;
        return (
            <div className="pt-7">
                <div className="pt-7 mb-7 d-flex">
                    <button
                        onClick={this.cancelPayment}
                        className="btn btn--secondary mr-3"
                    >
                        cancel
                    </button>
                    <button
                        onClick={this.completePayment}
                        className="btn btn--secondary"
                    >
                        complete
                    </button>
                </div>
                {payment && <pre>{JSON.stringify(payment, undefined, 2)}</pre>}
            </div>
        );
    }
}

export default Approve;
