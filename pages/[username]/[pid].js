import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import { firebaseClient } from "../../utils/firebaseClient";
import Router from "next/router";
import Routines from "./routines";

export default class extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        };

        this.subscribeDaysListener = this.subscribeDaysListener.bind(this);
        this.addRoutinesListener = this.addRoutinesListener.bind(this);
    }

    componentDidMount() {
        const progress = this.context.profile.purchases.programs.find(
            p => p.programId === Router.query.pid.split("_id")[1],
        );

        this.setState({
            progress,
            currentDayOrder: progress.dayOrder,
            isRestDay: progress.isRestDay,
        });
        this.subscribeDaysListener();
    }

    componentDidUpdate() {
        const { days, mounted, routines } = this.state;

        if (!mounted && days && routines) {
            this.setState({ mounted: true });
        }
    }

    testProfile = () => {
        firebaseClient()
            .db.collection("profiles")
            .doc(this.context.user.uid)
            .set({ ...this.context.profile, updatedAt: Date.now() });
    };

    programProgressUpdate = update => {
        console.log("extends -> update", update);
        const { profile, user } = this.context;
        const pid = Router.query.pid.split("_id")[1];
        console.log("extends -> pid", pid);

        const newPrograms = profile.purchases.programs.map(p => {
            if (p.programId === pid) {
                console.log("found");
                return {
                    ...p,
                    ...update,
                };
            } else {
                return p;
            }
        });
        console.log("extends -> newPrograms", newPrograms);
        firebaseClient()
            .db.collection("profiles")
            .doc(user.uid)
            .set({
                ...profile,
                purchases: {
                    ...profile.purchases,
                    programs: newPrograms,
                },
                updatedAt: Date.now(),
            });
    };

    testDays = (did, day) => {
        firebaseClient()
            .db.collection("days")
            .doc(did)
            .set({ ...day, updatedAt: Date.now() })
            .catch(err => console.error(err));
    };

    render() {
        const {
            mounted,
            routines,
            days,
            progress,
            currentDayOrder,
            isRestDay,
        } = this.state;

        if (!mounted)
            return <h1 className="title title--sm mt-7">loading...</h1>;

        return (
            <div className="user-workout">
                <p className="title title--ms text-black">{progress.title}</p>
                <div className="user-workout__container">
                    <aside className="user-workout__aside">
                        <div className="user-workout__aside-banner-container">
                            <img
                                src={progress.snippet.banner}
                                alt=""
                                className="user-workout__aside-banner-img"
                            />
                        </div>
                        <div className="user-workout__days">
                            {days.map(day => {
                                return (
                                    <p
                                        key={day._id}
                                        className={`user-workout__day ${day.order <
                                            progress.dayOrder &&
                                            "user-workout__day--completed"}
                                        
                                        ${day.order === currentDayOrder &&
                                            "user-workout__day--selected"}`}
                                        onClick={() => {
                                            this.addRoutinesListener(day._id);
                                            this.setState({
                                                currentDayOrder: day.order,
                                                isRestDay: day.isRestDay,
                                            });
                                        }}
                                    >
                                        <span className="title title--md">
                                            Day {day.order}
                                        </span>
                                        {day.isRestDay && <span>rest</span>}
                                        {day.order < progress.dayOrder && (
                                            <span className="check-box check-box-25 mr-2">
                                                <img
                                                    className="text-tertiary-2"
                                                    src="/success.svg"
                                                    alt=""
                                                />
                                            </span>
                                        )}
                                    </p>
                                );
                            })}
                        </div>
                    </aside>
                    <main className="user-workout__main">
                        {isRestDay ? (
                            <div>
                                <p className="title title--sm text-secondary">
                                    Your body and muscles need to get some rest
                                </p>
                            </div>
                        ) : (
                            <Routines
                                routines={routines}
                                onNext={this.programProgressUpdate}
                                routineProgress={{
                                    _id: progress.routineId,
                                    order: progress.routineOrder,
                                }}
                            />
                        )}
                    </main>
                </div>
            </div>
        );
    }

    async addRoutinesListener(dayId) {
        if (this.state.removeRoutinesListener) {
            this.state.removeRoutinesListener();
        }

        let removeRoutinesListener = await firebaseClient()
            .db.collection("routines")
            .where("dayId", "==", dayId)
            // .where("published", "==", true)
            .orderBy("order")
            .onSnapshot(docs => {
                let newRoutines = [];
                docs.forEach(doc => {
                    newRoutines.push(doc.data());
                });

                if (newRoutines.length > 0) {
                    this.setState({
                        removeRoutinesListener,
                        routines: newRoutines,
                    });
                } else {
                    removeRoutinesListener();
                    this.setState({
                        removeRoutinesListener: false,
                        routines: null,
                    });
                }
            });
    }

    async subscribeDaysListener() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
        }

        let unsubscribeDaysListener = await firebaseClient()
            .db.collection("days")
            .where("programId", "==", Router.query.pid.split("_id")[1])
            // .where("published", "==", true)
            .orderBy("order")
            .onSnapshot(docs => {
                let newDays = [];
                docs.forEach(doc => {
                    newDays.push(doc.data());
                });

                if (newDays.length > 0) {
                    this.addRoutinesListener(
                        this.state.progress.dayId || newDays[0]._id,
                    );
                }
                this.setState({
                    unsubscribeDaysListener,
                    days: newDays,
                });
            });
    }

    componentWillUnmount() {
        if (this.state.unsubscribeDaysListener) {
            this.state.unsubscribeDaysListener();
            this.setState({ unsubscribeDaysListener: null });
        }
    }
}

/**
 * 
(map)
completion
0
dayId
"a4e06c95090c43bfb50bb32e3ec304ce"
dayOrder
2
isRestDay
false
plan
"premium"
programId
"0a667d0e906c45a3bb10b4c2e3a4c72d"
purchasedAt
""
routine
"thisisroutineid"
routineId
""
slug
"clean-bulking-program-for-him_id0a667d0e906c45a3bb10b4c2e3a4c72d"
snippet
banner
"http://localhost:3000/images/bw-rph2.jpg"
category
"bulking"
description
"You eat like a madman, inhaling McDonalds and candy to beef-up your weekly calories on Saturdays because a trainer at the gym told you that"
difficulty
"advanced"
publishedAt
""
tags
title
"Clean bulking Program for him"
visitations
0
 */
