import React, { Component } from "react";
import AdminLayout from "../AdminLayout";
import crud from "../../../utils/firebaseCRUD";
import Link from "next/link";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = { mounted: false };
    }

    componentDidMount() {
        crud.getALlPrograms()
            .then(programs => this.setState({ programs, mounted: true }))
            .catch(err => console.error(err));
    }

    render() {
        const { mounted, programs } = this.state;

        if (!mounted) {
            return (
                <AdminLayout>
                    <p className="title title--sm text-tertiary">loading....</p>
                </AdminLayout>
            );
        }

        return (
            <AdminLayout>
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
                                        {p.contentDetails.routinesCount}{" "}
                                    </p>
                                </div>
                                <div className="dashall__item-actions">
                                    <Link
                                        href="/admin-panel/programs/edit/[pid]"
                                        as={`/admin-panel/programs/edit/${p._id}`}
                                    >
                                        <span className="dashall__item-action">
                                            <i>ed</i>
                                        </span>
                                    </Link>
                                    <span className="dashall__item-action">
                                        <i>del</i>
                                    </span>
                                    <span className="dashall__item-action">
                                        <i>pub</i>
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </AdminLayout>
        );
    }
}
