import React, { Component, Fragment } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import Nav from "../../../components/admin/programs/multi-step-bar";
import Router from "next/router";
import AppContext from "../../../context/AppContext";
import ProgramInfoForm from "../../../components/admin/programs/edit-forms/program-info-form";
import ProgramSalesForm from "../../../components/admin/programs/edit-forms/program-sales-form";
import ProgramPlansForm from "../../../components/admin/programs/edit-forms/program-plans-form";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { tab: 0 };
    }

    componentDidMount() {
        const { pid } = Router.query;
        const _id = pid.split("_id")[1];
        const ref = firebaseClient()
            .db.collection("program")
            .doc(_id);
        this.addProjectListener(ref);
        this.addSalesListener(ref);
        this.addPlansListener(ref);
        this.setState({ ref });
    }

    render() {
        const { tab, program, title, sales, plans } = this.state;

        const getForm = () => {
            const forms = [
                <ProgramInfoForm
                    program={program}
                    onTitle={title => this.setState({ title })}
                    onMainInfoChange={this.updateProgramInfo}
                />,
                <ProgramSalesForm
                    sales={sales}
                    handleSubmit={this.updateSalesInfo}
                />,
                <ProgramPlansForm
                    pricing={plans}
                    isFree={program.isFree}
                    handleSubmit={this.updatePlansInfo}
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

    componentWillUnmount() {
        if (this.state.removeProjectListener) {
            this.state.removeProjectListener();
        }
        if (this.state.removePlansListener) {
            this.state.removePlansListener();
        }
        if (this.state.removeSalesListener) {
            this.state.removeSalesListener();
        }
    }

    addProjectListener = async ref => {
        const { showEvent } = this.context;
        const removeProjectListener = ref.onSnapshot(snap => {
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
        this.state.ref
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

    updateSalesInfo = sales => {
        const { showEvent } = this.context;
        showEvent(<p>Updating sales info</p>);
        this.state.ref
            .collection("sales")
            .doc("salesDoc")
            .set(sales)
            .then(() => {
                showEvent(<p>Sales info Updated</p>);
            })
            .catch(err => {
                console.error(err);
                showEvent(<p>Error updating sales info</p>);
            });
    };

    addSalesListener = async ref => {
        const removeSalesListener = ref
            .collection("sales")
            .doc("salesDoc")
            .onSnapshot(snap => {
                if (!snap.exists) {
                    this.setState({ sales: null });
                }
                this.setState({ sales: snap.data() });
            });
        this.setState({ removeSalesListener });
    };

    updatePlansInfo = plans => {
        const { showEvent } = this.context;
        showEvent(<p>Updating plans info</p>);
        this.state.ref
            .collection("plans")
            .doc("plansDoc")
            .set(plans)
            .then(() => {
                showEvent(<p>Plans info Updated</p>);
            })
            .catch(err => {
                console.error(err);
                showEvent(<p>Error updating plans info</p>);
            });
    };

    addPlansListener = async ref => {
        const removePlansListener = ref
            .collection("plans")
            .doc("plansDoc")
            .onSnapshot(snap => {
                if (!snap.exists) {
                    this.setState({ plans: null });
                }
                this.setState({ plans: snap.data() });
            });
        this.setState({ removePlansListener });
    };
}
