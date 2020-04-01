import React from "react";
import Link from "../Link";

const DashLayout = ({ children }) => {
    return (
        <div className="dashboard">
            <aside className="dashboard__aside">
                <div className="navbar__brand">
                    <Link href="/">
                        <h1 className="text-black">Return to site</h1>
                    </Link>
                </div>
                <ul className="">
                    <li>
                        <p className="">Programs</p>
                        <ul className="ml-1">
                            <li>
                                <Link
                                    activeClassName=""
                                    href="/admin-panel/programs/all"
                                >
                                    <a className="">All</a>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    activeClassName=""
                                    href="/admin-panel/programs/drafts"
                                >
                                    <a className="">Drafts</a>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    activeClassName=""
                                    href="/admin-panel/programs/published"
                                >
                                    <a className="">Published</a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link activeClassName="" href="/admin-panel/stats">
                            <a className="">Stats</a>
                        </Link>
                    </li>

                    <li>
                        <Link activeClassName="" href="/admin-panel/settings">
                            <a className="">Settings</a>
                        </Link>
                    </li>
                </ul>
            </aside>

            <main className="dashboard__main">
                <div className="pr-2">{children}</div>
            </main>
        </div>
    );
};

export default DashLayout;
