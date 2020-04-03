import React, { Component } from "react";
import Router from "next/router";
import { firebaseClient } from "../../utils/firebaseClient";
import PayUP from "../../components/programs/pay";

export class PPPPay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const pid = Router.query.pid.split("_id")[1];
        const ref = firebaseClient()
            .db.collection("program")
            .doc(pid);

        ref.get().then(doc => {
            if (!doc.exists) {
                Router.push("/404");
            } else {
                this.setState({ main: doc.data() });
            }
        });

        ref.collection("plans")
            .doc("plansDoc")
            .get()
            .then(doc => {
                if (!doc.exists) {
                    Router.push("/404");
                } else {
                    this.setState({ plans: doc.data() });
                }
            });
    }

    render() {
        const { main, plans } = this.state;
        return <PayUP main={main} plans={plans} />;
    }
}

export default PPPPay;
