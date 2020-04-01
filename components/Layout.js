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

    const showEvent = (content, timeless) => {
        if (event !== null) {
            closeEvent();
        }
        if (timer) {
            clearTimeout(timer);
        }
        setEvent(content);
        document.getElementById("eventCheckBox").checked = true;
        if (!timeless) {
            const eventTimer = setTimeout(() => {
                closeEvent();
            }, 7000);
            setTimer(eventTimer);
        }
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
                closeEvent,
            }}
        >
            {!admin && <Navbar />}
            <div
                className="modal"
                style={{
                    zIndex: `${modalContent ? "1000" : "-2"}`,
                }}
            >
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
            </div>
            <div className="event">
                <input
                    className="modal__checkbox"
                    type="checkbox"
                    name=""
                    id="eventCheckBox"
                />
                <label htmlFor="eventCheckBox" className="event__event">
                    <div className="event__event--content">{event}</div>
                    <span className="check-box check-box-25 mr-2 event__event--close">
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
