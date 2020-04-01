import React, { Component, Fragment } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import Nav from "../../../components/admin/programs/multi-step-bar";
import Router from "next/router";
import AppContext from "../../../context/AppContext";
import ProgramInfoForm from "../../../components/admin/programs/edit-forms/program-info-form";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { tab: 0 };
    }

    componentDidMount() {
        const { pid } = Router.query;
        const _id = pid.split("_id")[1];
        this.addProjectListener(_id);
    }

    componentWillUnmount() {
        if (this.state.removeProjectListener) {
            this.state.removeProjectListener();
        }
    }

    addProjectListener = async id => {
        const { showEvent } = this.context;
        const removeProjectListener = firebaseClient()
            .db.collection("program")
            .doc(id)
            .onSnapshot(snap => {
                if (!snap.exists) {
                    showEvent(<p>This project does not exists</p>);
                    return Router.push("/error");
                }
                const program = snap.data();
                this.setState({ program, title: program.title });
            });
        this.setState({ removeProjectListener });
    };

    updateProgramInfo = info => {
        const { showEvent } = this.context;
        showEvent(<p>Updating Program...</p>);
        firebaseClient()
            .db.collection("program")
            .doc(info._id)
            .set(info)
            .then(() => {
                showEvent(<p>Program main info updated</p>);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            })
            .catch(err => {
                showEvent(<p>Error updating program</p>);
                console.error(err);
            });
    };

    render() {
        const { tab, program, title } = this.state;

        const getForm = () => {
            const forms = [
                <ProgramInfoForm
                    program={program}
                    onTitle={title => this.setState({ title })}
                    onMainInfoChange={this.updateProgramInfo}
                />,
            ];
            return forms[tab];
        };
        return (
            <Fragment>
                <Nav
                    steps={[
                        { index: 0, value: "basic info" },
                        { index: 1, value: "sales info" },
                        { index: 2, value: "pricing" },
                    ]}
                    tab={tab}
                    onAddDaysClick={() => {}}
                    setTab={tab => this.setState({ tab })}
                />
                {!program ? (
                    <p className="title--sm title">Loading program...</p>
                ) : (
                    <Fragment>
                        <p className="title title--md text-tertiary mt-3 mb-3 bolder">
                            {title}
                        </p>
                        <hr />
                        <div className="program-edit__forms">{getForm()}</div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
