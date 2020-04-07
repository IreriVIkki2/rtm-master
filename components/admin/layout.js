import { AiOutlineLeft } from "react-icons/ai";
import Link from "../Link";

const DashLayout = ({ children }) => {
    return (
        <div className="dashboard">
            <aside className="dashboard__aside">
                <button className="btn btn__link btn__link--light mb-2 font-smaller w-100">
                    <Link href="/">
                        <p className>
                            <span className="mr-1">
                                <AiOutlineLeft />
                            </span>
                            return to site
                        </p>
                    </Link>
                </button>
                <ul className="">
                    <li>
                        <p className="dashboard__link">
                            <Link
                                activeClassName="dashboard__link--active"
                                href="/admin-panel/programs/all"
                            >
                                <a className="link-unset">Programs</a>
                            </Link>
                        </p>
                        <ul className="dashboard__link--items">
                            <li className="dashboard__link">
                                <Link
                                    activeClassName="dashboard__link--active-inner"
                                    href="/admin-panel/programs/all"
                                >
                                    <a className="link-unset">All</a>
                                </Link>
                            </li>

                            <li className="dashboard__link">
                                <Link
                                    activeClassName="dashboard__link--active-inner"
                                    href="/admin-panel/programs/drafts"
                                >
                                    <a className="link-unset">Drafts</a>
                                </Link>
                            </li>

                            <li className="dashboard__link">
                                <Link
                                    activeClassName="dashboard__link--active-inner"
                                    href="/admin-panel/programs/published"
                                >
                                    <a className="link-unset">Published</a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="dashboard__link">
                        <Link
                            activeClassName="dashboard__link--active"
                            href="/admin-panel/stats"
                        >
                            <a className="link-unset">Stats</a>
                        </Link>
                    </li>

                    <li className="dashboard__link">
                        <Link
                            activeClassName="dashboard__link--active"
                            href="/admin-panel/settings"
                        >
                            <a className="link-unset">Settings</a>
                        </Link>
                    </li>
                </ul>
            </aside>

            <main className="dashboard__main">{children}</main>
        </div>
    );
};

export default DashLayout;
