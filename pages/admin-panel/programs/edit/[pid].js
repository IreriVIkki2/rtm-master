import React, { Component } from "react";
import { firebaseClient } from "../../../../utils/firebaseClient";
import AdminLayout from "../../AdminLayout";
import MainInfo from "./MainInfo";
import UserContext from "../../../../context/UserContext";
import Router from "next/router";
import SalesForm from "./SalesForm";
import PlansForm from "./PlansForm";
import Exercise from "./Exercise";
import querystring from "querystring";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            program: {},
            tab: 0,
            exercise: null,
            routine: null,
            loaded: false,
        };

        this.programListener = this.programListener.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.getNewUrl = this.getNewUrl.bind(this);
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
        const { queryParams } = this.state.program;
        if (queryParams && !this.state.loaded) {
            const href = this.getNewUrl(queryParams);
            Router.push(Router.pathname, href, { shallow: true });
            this.setState({ ...this.state, loaded: true, ...queryParams });
        }
    }

    updateInfo(res) {
        const { program, tab } = this.state;
        const newProg = {
            ...program,
            ...res,
            queryParams: {
                ...program.queryParams,
                tab: tab + 1,
                exercise: res.exercise ? res.exercise : null,
                routine: res.routine ? res.routine : null,
            },
        };

        const newParams = {
            tab: tab + 1,
            exercise: res.exercise ? res.exercise : null,
            routine: res.routine ? res.routine : null,
        };

        firebaseClient()
            .db.collection("programs")
            .doc(Router.query.pid)
            .set(newProg);

        this.setState({
            ...this.state,
            ...newParams,
        });

        const href = this.getNewUrl(newParams);
        Router.push(Router.pathname, href, { shallow: true });
    }

    getNewUrl(params) {
        const baseUrl = Router.pathname.replace("[pid]", Router.query.pid);
        const queryString = querystring.stringify(params);
        return `${baseUrl}?${queryString}`;
    }

    render() {
        const { program, tab } = this.state;
        const {
            snippet,
            slug,
            sales,
            plans,
            status,
            contentDetails,
            queryParams,
        } = program;

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
            <Exercise />,
        ];
        return (
            <div>
                <AdminLayout>
                    <div>
                        <p>
                            Primary Information. This is the main information
                            about this program including the banner, title,
                            message for the call to action button, a 140
                            character description for SEO and mobile preview
                        </p>
                        <hr />
                        <p>
                            a progress dot line to show creation of an new
                            program
                        </p>
                        <div style={{ display: "flex" }}>
                            {[0, 1, 2, 3, 4].map(i => {
                                return (
                                    <div
                                        key={i}
                                        style={{ marginRight: "20px" }}
                                    >
                                        <input
                                            type="radio"
                                            id={i}
                                            name="progress"
                                            onChange={() =>
                                                this.setState({
                                                    tab: i,
                                                })
                                            }
                                            value={i}
                                            checked={tab == i}
                                        />
                                        <label htmlFor={i}>{i}</label>
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                        <br />
                        {program && <div>{forms[tab]}</div>}
                        <hr />
                    </div>
                </AdminLayout>
                <pre>{JSON.stringify(this.state.program, undefined, 2)}</pre>
            </div>
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
