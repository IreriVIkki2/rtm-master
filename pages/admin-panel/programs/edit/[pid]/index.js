import React, { Component } from "react";
import { firebaseClient } from "../../../../../utils/firebaseClient";
import AdminLayout from "../../../AdminLayout";
import MainInfo from "../MainInfo";
import UserContext from "../../../../../context/UserContext";
import Router from "next/router";
import SalesForm from "../SalesForm";
import PlansForm from "../PlansForm";
import querystring from "querystring";

export default class extends Component {
    static contextType = UserContext;

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

        if (tab === 3) {
            const href = this.getNewUrl();
            Router.push(`${Router.pathname}/days`, href);
        }
        if (tab >= 0 && !this.state.loaded) {
            const href = this.getNewUrl({ tab });
            Router.push(Router.pathname, href, { shallow: true });
            this.setState({ ...this.state, loaded: true, tab });
        }
    }

    updateInfo(res) {
        const { program } = this.state;
        const tab = this.state.tab + 1;
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
        const baseUrl = Router.pathname.replace("[pid]", Router.query.pid);
        if (!params) return `${baseUrl}/days`;
        const queryString = querystring.stringify(params);
        return `${baseUrl}?${queryString}`;
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
                <div>
                    <p>
                        a progress dot line to show creation of an new program
                    </p>
                    <div style={{ display: "flex" }}>
                        {[0, 1, 2].map(i => {
                            return (
                                <div key={i} style={{ marginRight: "20px" }}>
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
