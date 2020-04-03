import React, { Component } from "react";
import Router from "next/router";
import { firebaseClient } from "../../utils/firebaseClient";
import ProgramInfo from "../../components/programs/pid";
import axios from "axios";
import AppContext from "../../context/AppContext";

export default class extends Component {
    static contextType = AppContext;
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

        ref.collection("sales")
            .doc("salesDoc")
            .get()
            .then(doc => {
                if (!doc.exists) {
                    Router.push("/404");
                } else {
                    this.setState({ sales: doc.data() });
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

    handlePay = (kshPrice, name) => {
        const { showModal, closeModal } = this.context;
        showModal(
            <div className="card">
                <p>Please hold while we redirect you to payment page...</p>
            </div>,
        );
        axios
            .get("/api/pay", {
                params: {
                    amount: kshPrice,
                    product: name,
                    pid: Router.query.pid,
                },
            })
            .then(res => {
                if (res.data.link) {
                    closeModal();
                    window.open(res.data.link, "_blank");
                }
            });
    };

    render() {
        const { main, sales, plans } = this.state;
        if (!main || !sales || !plans) {
            return <p className="title title--sm">Loading program...</p>;
        }
        return (
            <ProgramInfo
                main={main}
                sales={sales}
                plans={plans}
                handlePay={this.handlePay}
            />
        );
    }
}
