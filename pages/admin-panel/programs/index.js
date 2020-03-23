import React, { Component } from "react";
import { firebaseClient } from "../../../utils/firebaseClient";
import { Router } from "next/router";
import AdminLayout from "../AdminLayout";
import crud from "../../../utils/firebaseCRUD";
import Link from "next/link";
import { IoMdTrash } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = { mounted: false, deleting: false };
    }

    componentDidMount() {
        this.addDaysListener();
    }

    handleNewProgramClick = async () => {
        await crud
            .createNewProgram()
            .then(pid => Router.push(`/admin-panel/programs/edit/${pid}`))
            .catch(err => console.error(err));
    };

    publishProgram = async program => {
        const doc = {
            ...program,
            status: {
                ...program.status,
                isComplete: true,
                publishAt: Date.now(),
                published: true,
                updatedAt: Date.now(),
            },
        };

        firebaseClient()
            .db.collection("programs")
            .doc(program._id)
            .set(doc);
    };

    render() {
        const { mounted, programs, deleting } = this.state;

        if (!mounted) {
            return (
                <AdminLayout>
                    <p className="title title--sm text-tertiary">loading....</p>
                </AdminLayout>
            );
        }

        return (
            <AdminLayout>
                <div className="p-1">
                    <div>
                        <button className="btn btn--secondary mt-3 ml-1">
                            Create New Program
                        </button>
                    </div>

                    {deleting && (
                        <div>
                            <button className="btn btn--secondary mt-3 ml-auto mr-3">
                                deleting
                            </button>
                        </div>
                    )}

                    <ul className="dashall">
                        {programs.map(p => {
                            return (
                                <li key={p._id} className="dashall__item">
                                    <div className="dashall__item-title">
                                        <p className="">{p.snippet.title}</p>
                                    </div>
                                    <div className="dashall__item-published">
                                        <p className="">
                                            {p.status.published
                                                ? "published"
                                                : "draft"}
                                        </p>
                                    </div>
                                    <div className="dashall__item-days">
                                        <p className="">
                                            {p.contentDetails.daysCount}
                                        </p>
                                    </div>
                                    <div className="dashall__item-routines">
                                        <p className="">
                                            {p.contentDetails.routinesCount}
                                        </p>
                                    </div>
                                    <div className="dashall__item-actions">
                                        <Link
                                            href="/admin-panel/programs/edit/[pid]"
                                            as={`/admin-panel/programs/edit/${p._id}`}
                                        >
                                            <span className="dashall__item-action">
                                                <IoMdCreate />
                                            </span>
                                        </Link>
                                        <span
                                            onClick={() =>
                                                this.publishProgram(p)
                                            }
                                            className="dashall__item-action"
                                        >
                                            <IoMdCheckmark />
                                        </span>
                                        <span
                                            onClick={() =>
                                                this.deleteProgram(p._id)
                                            }
                                            className="dashall__item-action"
                                        >
                                            <IoMdTrash />
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </AdminLayout>
        );
    }

    componentWillUnmount() {
        if (this.state.removeProgramsListener) {
            this.state.removeProgramsListener();
        }
    }

    addDaysListener = () => {
        let removeProgramsListener = firebaseClient()
            .db.collection("programs")
            .onSnapshot(snap => {
                let programs = [];

                snap.forEach(program => {
                    programs.push(program.data());
                });

                this.setState({ programs, mounted: true });
            });

        this.setState({ removeProgramsListener });
    };

    deleteProgram = async pid => {
        this.setState({ deleting: true });
        const deleteDay = async did => {
            await firebaseClient()
                .db.collection("programs")
                .doc(pid)
                .delete();
        };

        const deleteRoutine = async rid => {
            await firebaseClient()
                .db.collection("routines")
                .doc(rid)
                .delete();
        };

        await firebaseClient()
            .db.collection("days")
            .where("programId", "==", pid)
            .get()
            .then(docs => {
                docs.forEach(async doc => {
                    await deleteDay(doc.id);
                });
            });

        await firebaseClient()
            .db.collection("routines")
            .where("programId", "==", pid)
            .get()
            .then(docs => {
                docs.forEach(async doc => {
                    await deleteRoutine(doc.id);
                });
            });

        await firebaseClient()
            .db.collection("programs")
            .doc(pid)
            .delete()
            .then(success => {
                this.setState({ deleting: false });
            });
    };
}
