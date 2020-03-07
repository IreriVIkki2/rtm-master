import React, { Component } from "react";
import AdminLayout from "../../AdminLayout";
import MainInfo from "./MainInfo";
import { firebaseClient } from "../../../../utils/firebaseClient";
import UserContext from "../../../../context/UserContext";
import Router from "next/router";
import { newProgramObject } from "../../../../utils/initialObjects";
import SalesForm from "./SalesForm";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            program: {},
            currentForm: 0,
        };

        this.programListener = this.programListener.bind(this);
        this.updateMainInfo = this.updateMainInfo.bind(this);
    }

    componentDidMount() {
        if (this.context.isAdmin) {
            // const pg = newProgramObject();
            // this.setState({ program: pg });
            this.programListener();
            sessionStorage.setItem(
                "program",
                JSON.stringify(this.state.program),
            );
        }
    }

    updateMainInfo(res) {
        const newProg = {
            ...this.state.program,
            ...res,
        };
        console.log("extends -> updateMainInfo -> newProg", newProg);

        firebaseClient()
            .db.collection("programs")
            .doc(Router.query.pid)
            .set({
                ...this.state.program,
                ...res,
            });

        this.setState({ currentForm: this.state.currentForm + 1 });
    }

    render() {
        const { program, currentForm } = this.state;
        const { snippet, slug, sales } = program;

        const forms = [
            <MainInfo
                snippet={snippet}
                slug={slug}
                onMainInfoChange={this.updateMainInfo}
            />,
            <SalesForm sales={sales} />,
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
                                                    currentForm: i,
                                                })
                                            }
                                            value={i}
                                            checked={currentForm == i}
                                        />
                                        <label htmlFor={i}>{i}</label>
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                        {forms[currentForm]}
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
