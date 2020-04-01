import Navbar from "./Navbar";
import Footer from "./Footer";
import AppContext from "../context/AppContext";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const Layout = ({ children, context }) => {
    const [modalContent, setModalContent] = useState(null);
    const [event, setEvent] = useState(null);
    const [timer, setTimer] = useState(null);

    const showModal = content => {
        document.getElementById("modalCheckBox").checked = true;
        setModalContent(content);
    };

    const closeModal = () => {
        document.getElementById("modalCheckBox").checked = false;
        setModalContent(null);
    };

    const closeEvent = () => {
        clearTimeout(timer);
        document.getElementById("eventCheckBox").checked = false;
        setTimer(null);
    };

    const showEvent = content => {
        if (timer) {
            clearTimeout(timer);
        }
        setEvent(content);
        document.getElementById("eventCheckBox").checked = true;
        const eventTimer = setTimeout(() => {
            closeEvent();
        }, 15000);
        setTimer(eventTimer);
    };

    const router = useRouter();
    const admin = router.asPath.startsWith("/admin");

    return (
        <AppContext.Provider
            value={{
                ...context,
                showModal,
                closeModal,
                showEvent,
            }}
        >
            {!admin && <Navbar />}
            <div className="modal">
                <input
                    className="modal__checkbox"
                    type="checkbox"
                    name=""
                    id="modalCheckBox"
                />

                <div className="modal__content">{modalContent}</div>
                <label
                    className="modal__backdrop"
                    htmlFor="modalCheckBox"
                    onClick={() => setModalContent(null)}
                />
                <input
                    className="modal__checkbox"
                    type="checkbox"
                    name=""
                    id="eventCheckBox"
                />
                <label htmlFor="eventCheckBox" className="modal__event">
                    <div className="modal__event--content">{event}</div>
                    <span className="check-box check-box-25 mr-2 modal__event--close">
                        <AiOutlineCloseCircle />
                    </span>
                </label>
            </div>
            {children}
            {!admin && <Footer />}
        </AppContext.Provider>
    );
};

export default Layout;
