import React, { Component, Fragment } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import NewProgram from "./new";
import AllPrograms from "../../../components/admin/programs/all";
import AppContext from "../../../context/AppContext";
import Router from "next/router";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.addProgramsListener();
    }

    componentWillUnmount() {
        if (this.state.removeProgramsListener) {
            this.state.removeProgramsListener();
        }
    }

    addProgramsListener = async () => {
        const removeProgramsListener = await firebaseClient()
            .db.collection("program")
            .onSnapshot((snap) => {
                let programs = [];

                snap.forEach((program) => {
                    programs.push(program.data());
                });

                this.setState({ programs });
            });

        this.setState({ removeProgramsListener });
    };

    publish = async (id, published) => {
        const { showEvent } = this.context;
        const update = { published, updatedAt: Date.now() };
        published ? (update["publishedAt"] = Date.now()) : null;

        await firebaseClient()
            .db.collection("program")
            .doc(id)
            .update(update)
            .then(() =>
                published
                    ? showEvent(<p>Program published</p>)
                    : showEvent(<p>Program reverted to draft</p>),
            )
            .catch((err) => {
                console.error(err);
                published
                    ? showEvent(<p>Error publishing program</p>)
                    : showEvent(<p>Error reverting to draft</p>);
            });
    };

    deleteProgram = async (id) => {
        const { showEvent, closeModal } = this.context;
        const pRef = firebaseClient().db.collection("program").doc(id);
        showEvent(<p>Deleting program...</p>);

        pRef.delete()
            .then(() => pRef.collection("sales").doc("salesDoc").delete())
            .then(() => {
                closeModal();
                showEvent(<p>program deleted</p>);
            })
            .catch((err) => {
                closeModal();
                showEvent(<p>Failed! Could not delete program</p>);
                throw err;
            });
    };

    editProgram = (slug) =>
        Router.push(
            "/admin-panel/programs/edit/[pid]",
            `/admin-panel/programs/edit/${slug}`,
        );

    render() {
        const { programs } = this.state;
        const { showModal, closeModal } = this.context;
        return (
            <Fragment>
                <NewProgram />
                <AllPrograms
                    showModal={showModal}
                    closeModal={closeModal}
                    programs={programs}
                    del={this.deleteProgram}
                    edit={this.editProgram}
                    publish={this.publish}
                />
            </Fragment>
        );
    }
}
