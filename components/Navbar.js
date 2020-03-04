import { useContext } from "react";

import UserContext from "../context/UserContext";

const Navbar = ({}) => {
    const { user, signIn, signOut, profile } = useContext(UserContext);
    console.log("Navbar -> profile", profile);
    return (
        <div>
            {user ? (
                <button onClick={signOut}>Logout</button>
            ) : (
                <button onClick={signIn}>Login</button>
            )}
        </div>
    );
};

export default Navbar;
