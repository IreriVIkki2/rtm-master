import React, { Component } from "react";
import AdminLayout from "../../../AdminLayout";
import firebaseCRUD from "../../../../../utils/firebaseCRUD";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import Router from "next/router";
import Routines from "./routines";
// import querystring from "querystring";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: [],
            unsubscribeDaysListener: null,
            dayId: null,
            checked: "",
        };

        this.handleCreateNewDay = this.handleCreateNewDay.bind(this);
        this.addDaysListener = this.addDaysListener.bind(this);
    }

    shouldComponentUpdate(prevState, nextState) {
        return true;
    }

    componentDidMount() {
        this.addDaysListener();
    }

    componentDidUpdate() {
        // console.log(this.state);
    }

    async handleCreateNewDay() {
        const { query } = Router;
        const { days } = this.state;
        await firebaseCRUD
            .createNewDay(query.pid, days.length + 1)
            .then(dayId => {
                this.setState({ dayId, checked: dayId });
                console.log(dayId);
            })
            .catch(err => console.error(err));
    }

    render() {
        const { days, dayId, checked } = this.state;
        const currentDay = days.find(day => day._id === dayId);
        return (
            <AdminLayout hidden={true}>
                <div className="day-edit">
                    <aside className="day-edit__aside">
                        <button
                            className="btn mb-2 w-100"
                            onClick={this.handleCreateNewDay}
                        >
                            Add Day
                        </button>
                        <ul className="day-edit__days">
                            {days.map(day => {
                                return (
                                    <li
                                        key={day._id}
                                        className={`day-edit__day ${checked ===
                                            day._id &&
                                            "day-edit__day--checked"}`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={day._id}
                                            name="days"
                                            value="Bike"
                                            className="d-none"
                                            onChange={() =>
                                                this.setState({
                                                    checked: day._id,
                                                })
                                            }
                                        />
                                        <label
                                            className="day-edit__day-label"
                                            htmlFor={day._id}
                                            onClick={() =>
                                                this.setState({
                                                    dayId: day._id,
                                                })
                                            }
                                        >
                                            Day {day.order}
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>
                    <main className="day-edit__main">
                        {currentDay && (
                            <Routines day={currentDay} dayId={dayId}></Routines>
                        )}
                    </main>
                </div>
            </AdminLayout>
        );
    }

    componentWillUnmount() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
        }
    }

    addDaysListener() {
        let unsubscribeDaysListener = firebaseClient()
            .db.collection("days")
            .where("programId", "==", Router.query.pid)
            .orderBy("order")
            .onSnapshot(daysSnapshot => {
                let days = [];
                daysSnapshot.forEach(day => {
                    days.push(day.data());
                });
                const dayId = days[0] ? days[0]._id : null;
                this.setState({ days, dayId, checked: dayId });
            });
        this.setState({ unsubscribeDaysListener });
    }
}
