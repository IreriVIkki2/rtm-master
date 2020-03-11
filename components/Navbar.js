import { useContext } from "react";
import Link from "./Link";

import UserContext from "../context/UserContext";

const Navbar = ({}) => {
    const { user, signIn, signOut, profile, isAdmin } = useContext(UserContext);
    return (
        <nav style={{ display: "flex", alignItems: "center" }}>
            <style jsx>{`
                .active {
                    color: red;
                }
                .nav-link {
                    text-decoration: none;
                    margin: 0 20px;
                    padding: 10px;
                    display: block;
                }
            `}</style>
            <div>
                <Link href="/">
                    <h1>Rhotimmi</h1>
                </Link>
            </div>

            <ul style={{ display: "flex", listStyle: "none" }}>
                <li>
                    <Link activeClassName="active" href="/">
                        <a className="nav-link">Home</a>
                    </Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/programs">
                        <a className="nav-link">Programs</a>
                    </Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/blog">
                        <a className="nav-link">Blog</a>
                    </Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/about">
                        <a className="nav-link">About</a>
                    </Link>
                </li>
                <li>
                    <Link activeClassName="active" href="/contact">
                        <a className="nav-link">Contact</a>
                    </Link>
                </li>
            </ul>

            {user ? (
                <div>
                    <Link href="/user/username">
                        <div>
                            <img
                                width="40px"
                                height="40px"
                                style={{ borderRadius: "50%" }}
                                src={user.photoURL}
                                alt=""
                            />
                            <p>{user.displayName}</p>
                        </div>
                    </Link>

                    {isAdmin && (
                        <Link href="/admin-panel">
                            <a>Admin panel</a>
                        </Link>
                    )}

                    <button onClick={signOut}>Logout</button>
                </div>
            ) : (
                <button onClick={signIn}>Login</button>
            )}
        </nav>
    );
};

export default Navbar;
