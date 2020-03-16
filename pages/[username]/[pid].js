import React, { Component } from "react";
import UserContext from "../../context/UserContext";
import { firebaseClient } from "../../utils/firebaseClient";
import Router from "next/router";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        console.log("constructor");

        this.state = {
            mounted: false,
        };

        this.subscribeDaysListener = this.subscribeDaysListener.bind(this);
    }

    componentDidMount() {
        this.subscribeDaysListener();
    }

    componentDidUpdate() {
        console.log(this.context);
        const { days, mounted } = this.state;
        if (!mounted && days) {
            this.setState({ mounted: true });
        }
    }

    render() {
        if (!this.state.mounted)
            return <h1 className="title title--sm mt-7">loading...</h1>;

        return (
            <div>
                <h1 className="title title--lg mt-7">Follow Through</h1>
                <div className="watch">
                    <div className="">
                        {this.state.days.map(day => {
                            return (
                                <div key={day._id} className="">
                                    <p className="title title--md">
                                        Day {day.order}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className=""></div>
                </div>
            </div>
        );
    }

    async subscribeDaysListener() {
        let days = [];
        let unsubscribeDaysListener = await firebaseClient()
            .db.collection("days")
            .where("programId", "==", Router.query.pid)
            // .where("published", "==", true)
            // .orderBy("order")
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    days.push(doc.data());
                });
                this.setState({ unsubscribeDaysListener, days });
            });
    }

    componentWillUnmount() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
        }
    }
}
