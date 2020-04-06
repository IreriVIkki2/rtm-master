import React, { Component } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import crud from "../../utils/crud";
import AppContext from "../../context/AppContext";
import Approve from "../../components/programs/approve";
import Router from "next/router";
import axios from "axios";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const pid = Router.query.pid.split("_id")[1];
        const ref = firebaseClient().db.collection("program").doc(pid);

        ref.get().then((doc) => {
            if (!doc.exists) {
                Router.push("/404");
            } else {
                this.setState({ program: doc.data() });
            }
        });
    }

    cancelPayment = () => {
        const { showModal, closeModal } = this.context;
        showModal(
            <div className="card bg--color-text-light text-center">
                <p className="title--md text-black mb-3 pt-7">
                    Are you sure you want to cancel this purchase?
                </p>
                <div className="text-white mb-7 d-flex text-center">
                    <button
                        onClick={closeModal}
                        className="btn btn--secondary mr-3"
                    >
                        No, return to purchase
                    </button>
                    <button
                        onClick={() => {
                            Router.replace("/programs");
                            closeModal();
                        }}
                        className="btn btn--tertiary"
                    >
                        Yes, cancel the purchase
                    </button>
                </div>
            </div>,
        );
    };

    approvePayment = async () => {
        const { profile, showModal, showEvent, closeModal } = this.context;
        showEvent(<p>Please hold while we set things up for you...</p>);
        const { program } = this.state;
        let payment = null;
        await axios
            .get("/api/approve", {
                params: { ...Router.query },
            })
            .then((res) => {
                payment = res.data.payment;
            });

        console.log("extends -> approvePayment -> payment", payment);
        crud.createSale({
            paymentID: payment.id,
            userId: profile._id,
            state: payment.state,
            cart: payment.cart,
            create_time: payment.create_time,
            update_time: payment.update_time,
            link: payment.links[0].href,
            links: payment.transactions[0].related_resources[0].sale.links,
            amount: payment.transactions[0].amount,
            payer_info: payment.payer.payer_info,
        }).catch(() => {
            showEvent(<p>Purchase could not be completed</p>);
        });

        firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .doc(program._id)
            .set({
                paymentID: payment.id,
                _id: program._id,
                days: {},
                daysCompleted: 0,
                routinesCompleted: 0,
                progress: 0,
                plan: "basic",
                purchasedAt: Date.now(),
            })
            .then(() => {
                showModal(
                    <div className="card bg--color-text-light mx-3 text-center">
                        <p className="title--md text-black mt-3 mb-3">
                            Congratulations {profile.displayName}!🎊
                        </p>
                        <p className="mb-3 text-primary">
                            Your journey begins now.
                        </p>
                        <button
                            onClick={() => {
                                Router.replace(
                                    "/u/[username]",
                                    `/u/${profile.displayName}`,
                                );
                                closeModal();
                            }}
                            className="btn btn--primary mb-3"
                        >
                            View Program Now
                        </button>
                    </div>,
                );
            })
            .catch(() => {
                showEvent(<p>Purchase could not be completed</p>);
            });
    };

    render() {
        const { program } = this.state;
        if (program === undefined) {
            return <p className="title title--sm">Loading...</p>;
        }
        return (
            <Approve
                amount={Router.query.total}
                program={program}
                cancelPayment={this.cancelPayment}
                approvePayment={this.approvePayment}
            />
        );
    }
}
