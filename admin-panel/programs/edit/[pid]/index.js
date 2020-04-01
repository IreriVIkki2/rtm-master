import React, { Component, Fragment } from "react";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import AdminLayout from "../../../AdminLayout";
import MainInfo from "../MainInfo";
import AppContext from "../../../../../context/AppContext";
import Router from "next/router";
import SalesForm from "../SalesForm";
import PlansForm from "../PlansForm";
import querystring from "querystring";

export default class extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            program: {},
            tab: 0,
            loaded: false,
        };

        this.programListener = this.programListener.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.getNewUrl = this.getNewUrl.bind(this);
        this.onAddDaysClick = this.onAddDaysClick.bind(this);
    }

    async componentDidMount() {
        if (this.context.isAdmin) {
            await this.programListener();

            sessionStorage.setItem(
                "program",
                JSON.stringify(this.state.program),
            );
        }
    }

    componentDidUpdate() {
        const { tab } = this.state.program;

        if (tab > 2 && !this.state.loaded) {
            const href = this.getNewUrl({ tab: 0 });
            Router.push(Router.pathname, href, { shallow: true });
            this.setState({ ...this.state, loaded: true, tab: 0 });
        }

        if (tab >= 0 && !this.state.loaded) {
            const href = this.getNewUrl({ tab });
            Router.push(Router.pathname, href, { shallow: true });
            this.setState({ ...this.state, loaded: true, tab });
        }
    }

    onAddDaysClick() {
        const href = this.getNewUrl();
        Router.push(`${Router.pathname}/days`, href);
    }

    updateInfo(res) {
        const { program } = this.state;
        const stTab = this.state.tab;
        const tab = stTab > 1 ? stTab : stTab + 1;
        const newProg = {
            ...program,
            ...res,
            tab,
        };

        firebaseClient()
            .db.collection("programs")
            .doc(Router.query.pid)
            .set(newProg);

        this.setState({ tab });

        if (tab === 3) {
            const href = this.getNewUrl();
            Router.push(`${Router.pathname}/days`, href);
        } else {
            const href = this.getNewUrl({ tab });
            Router.push(Router.pathname, href, { shallow: true });
        }
    }

    getNewUrl(params) {
        const url = Router.pathname.replace("[pid]", Router.query.pid);
        if (!params) return `${url}/days`;
        const queryString = querystring.stringify(params);
        return `${url}?${queryString}`;
    }

    render() {
        const { program, tab } = this.state;
        const { snippet, slug, sales, plans, status, contentDetails } = program;

        const forms = [
            <MainInfo
                snippet={snippet}
                slug={slug}
                onMainInfoChange={this.updateInfo}
            />,
            <SalesForm sales={sales} handleSubmit={this.updateInfo} />,
            <PlansForm
                plans={plans}
                status={status}
                contentDetails={contentDetails}
                handleSubmit={this.updateInfo}
            />,
        ];

        return (
            <AdminLayout>
                <div className="program-edit">
                    <div className="multi-step-bar">
                        <div className="multi-step-bar__container">
                            {[
                                { index: 0, value: "basic info" },
                                { index: 1, value: "sales info" },
                                { index: 2, value: "pricing" },
                            ].map(i => {
                                return (
                                    <div key={i.index} className="">
                                        <input
                                            type="radio"
                                            id={i.index}
                                            name="progress"
                                            onChange={() =>
                                                this.setState({
                                                    tab: i.index,
                                                })
                                            }
                                            value={i}
                                            checked={tab == i.index}
                                            className="d-none"
                                        />
                                        <label
                                            className={`multi-step-bar__item btn ${i.index <=
                                                this.state.tab &&
                                                "multi-step-bar__item--visited"}`}
                                            htmlFor={i.index}
                                        >
                                            {i.value}
                                        </label>
                                    </div>
                                );
                            })}
                            <button
                                onClick={this.onAddDaysClick}
                                className="btn multi-step-bar__item"
                            >
                                add days
                            </button>
                        </div>
                    </div>
                    {program && snippet && (
                        <Fragment>
                            <p className="title title--md text-tertiary mt-3 mb-3 bolder">
                                {snippet.title}
                            </p>
                            <hr />
                            <div className="program-edit__forms">
                                {forms[tab]}
                            </div>
                        </Fragment>
                    )}
                </div>
            </AdminLayout>
        );
    }

    programListener() {
        let unsubscribeProgramListener = firebaseClient()
            .db.collection("programs")
            .doc(Router.query.pid)
            .onSnapshot(querySnapshot => {
                this.setState({ program: querySnapshot.data() });
            });

        this.setState({ unsubscribeProgramListener });
    }

    componentWillUnmount() {
        if (this.state.unsubscribeProgramListener) {
            this.state.unsubscribeProgramListener();
        }
    }
}
