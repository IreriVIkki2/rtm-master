import { useContext } from "react";
import Link from "./Link";

import AppContext from "../context/AppContext";

const Navbar = ({}) => {
    const { signOut, profile, auth } = useContext(AppContext);
    return (
        <nav className="navbar">
            <div className="navbar__toggler">
                <div className="navbar__toggler--container">
                    <div className="navbar__toggler--bars"></div>
                </div>
            </div>
            <div className="navbar__brand">
                <Link href="/">
                    <h1 className="navbar__brand--title">Rhotimmi</h1>
                </Link>
            </div>

            <ul className="navbar__nav">
                <li className="navbar__nav--item">
                    <Link activeClassName="navbar__nav--link-active" href="/">
                        <a className="title-sm title navbar__nav--link">Home</a>
                    </Link>
                </li>
                <li className="navbar__nav--item">
                    <Link
                        activeClassName="navbar__nav--link-active"
                        href="/programs"
                    >
                        <a className="title-sm title navbar__nav--link">
                            Programs
                        </a>
                    </Link>
                </li>

                <li className="navbar__nav--item">
                    <Link
                        activeClassName="navbar__nav--link-active"
                        href="/about"
                    >
                        <a className="title-sm title navbar__nav--link">
                            About
                        </a>
                    </Link>
                </li>

                <li className="navbar__nav--item">
                    <Link
                        activeClassName="navbar__nav--link-active"
                        href="/contact"
                    >
                        <a className="title-sm title navbar__nav--link">
                            Contact
                        </a>
                    </Link>
                </li>

                {auth ? (
                    <li className="navbar__nav--item navbar__account">
                        <Link
                            as={`/u/${profile.displayName}`}
                            href="/u/[username]"
                        >
                            <div className="navbar__user">
                                <img
                                    className="navbar__user--icon"
                                    src={profile.photoUrl}
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="navbar__account--dropdown">
                            <ul className="navbar__userOptions">
                                <li className="mb-1">
                                    <Link
                                        href="/u/[username]"
                                        as={`/u/${profile.displayName}`}
                                    >
                                        <a className="title text-secondary">
                                            {profile.displayName}
                                        </a>
                                    </Link>
                                </li>
                                <hr className="mb-1" />
                                <li className="mb-1">
                                    <Link
                                        href="/u/[username]/settings"
                                        as={`/u/${profile.displayName}/settings`}
                                    >
                                        <a className="title navbar__userOptions-link">
                                            settings
                                        </a>
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    {profile.isAdmin && (
                                        <Link href="/admin-panel">
                                            <a className="title navbar__userOptions-link">
                                                Admin panel
                                            </a>
                                        </Link>
                                    )}
                                </li>
                                <li className="mb-2">
                                    <button
                                        className="btn btn--light"
                                        onClick={signOut}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                ) : (
                    <li>
                        <Link href="/auth/login">
                            <button className="btn btn--light">Login</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
