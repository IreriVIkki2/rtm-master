import { useContext } from "react";
import Link from "next/link";

import UserContext from "../context/UserContext";

const Navbar = ({}) => {
    const { user, signIn, signOut, profile } = useContext(UserContext);
    return (
        <nav style={{ display: "flex", alignItems: "center" }}>
            <div>
                <Link href="/">
                    <h1>Rhotimmi</h1>
                </Link>
            </div>

            <ul style={{ display: "flex", listStyle: "none" }}>
                <li style={{ margin: "0 20px" }}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li style={{ margin: "0 20px" }}>
                    <Link href="/programs">
                        <a>Programs</a>
                    </Link>
                </li>
                <li style={{ margin: "0 20px" }}>
                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>
                </li>
                <li style={{ margin: "0 20px" }}>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </li>
                <li style={{ margin: "0 20px" }}>
                    <Link href="/contact">
                        <a>Contact</a>
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
                    <button onClick={signOut}>Logout</button>
                </div>
            ) : (
                <button onClick={signIn}>Login</button>
            )}
        </nav>
    );
};

export default Navbar;
