import React, { Component } from "react";
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

    addProgramsListener = async () => {
        const removeProgramsListener = await firebaseClient()
            .db.collection("program")
            .onSnapshot(snap => {
                let programs = [];

                snap.forEach(program => {
                    programs.push(program.data());
                });

                this.setState({ programs });
            });

        this.setState({ removeProgramsListener });
    };

    confirmDelete = id => {
        const { showModal, closeModal } = this.context;
        showModal(
            <div>
                <p>
                    Are you sure you want to delete this program,
                    <span>Note that this operation cannot be reversed</span>
                    <button onClick={closeModal} className="btn btn--primary">
                        Cancel
                    </button>
                    <button
                        onClick={() => this.deleteProgram(id)}
                        className="btn btn--secondary"
                    >
                        yes, delete
                    </button>
                </p>
            </div>,
        );
    };

    deleteProgram = async id => {
        const { showEvent, closeModal } = this.context;

        firebaseClient()
            .db.collection("program")
            .doc(id)
            .delete()
            .then(() => {
                showEvent(<p>program deleted</p>);
                closeModal();
            })
            .catch(err => {
                closeModal();
                showEvent(<p>Failed! Could not delete program</p>);
                throw err;
            });
    };

    editProgram = slug =>
        Router.push(
            "/admin-panel/programs/edit/[pid]",
            `/admin-panel/programs/edit/${slug}`,
        );

    render() {
        const { programs } = this.state;
        return (
            <div>
                <NewProgram />
                <AllPrograms
                    programs={programs}
                    del={this.confirmDelete}
                    edit={this.editProgram}
                />
            </div>
        );
    }
}
