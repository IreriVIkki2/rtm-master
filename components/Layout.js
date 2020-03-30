import Navbar from "./Navbar";
import Footer from "./Footer";
import AppContext from "../context/AppContext";

const Layout = ({ children, context }) => {
    return (
        <AppContext.Provider
            value={{
                ...context,
            }}
        >
            <Navbar />
            {children}
            <Footer />
        </AppContext.Provider>
    );
};

export default Layout;
