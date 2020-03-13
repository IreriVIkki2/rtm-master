import { useContext } from "react";
import Link from "./Link";

import UserContext from "../context/UserContext";

const Navbar = ({}) => {
    const { user, signIn, signOut, isAdmin } = useContext(UserContext);
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
                        href="/contact"
                    >
                        <a className="title-sm title navbar__nav--link">
                            Contact
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

                {user ? (
                    <li className="navbar__nav--item">
                        <Link href="/user/username">
                            <div>
                                <img src={user.photoURL} alt="" />
                                <p>{user.displayName}</p>
                            </div>
                        </Link>

                        {isAdmin && (
                            <Link href="/admin-panel">
                                <a>Admin panel</a>
                            </Link>
                        )}

                        <button onClick={signOut}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <button className="btn" onClick={signIn}>
                            Client Login
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
