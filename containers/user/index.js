import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import { firebaseClient } from "../../utils/firebaseClient";
import UserHome from "../../components/user";

export default class extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.addMyProgramsListener();
    }

    render() {
        const { myPrograms, programs } = this.state;
        const { showModal, closeModal } = this.context;

        return (
            <UserHome
                showModal={showModal}
                closeModal={closeModal}
                programs={programs}
                myPrograms={myPrograms}
                profile={this.context.profile}
                restartProgress={this.restartProgress}
            />
        );
    }

    addMyProgramsListener = () => {
        const { profile } = this.context;
        const removeMyProgramsListener = firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .onSnapshot((docsSnap) => {
                let myPrograms = [];
                docsSnap.forEach((doc) => myPrograms.push(doc.data()));
                this.setState({ myPrograms });
                this.getPrograms();
            });
        this.setState({ removeMyProgramsListener });
    };

    restartProgress = (pid) => {
        const { showEvent, profile } = this.context;
        showEvent(<p>Resetting your progress</p>);
        const { myPrograms } = this.state;
        const pp = myPrograms.find((p) => p._id === pid);
        firebaseClient()
            .db.collection("profiles")
            .doc(profile._id)
            .collection("programs")
            .doc(pid)
            .set({
                ...pp,
                days: {},
                daysCompleted: 0,
                progress: 0,
                routinesCompleted: 0,
            })
            .then(() => showEvent(<p>Progress reset successful</p>))
            .catch(() => showEvent(<p>Error resetting your progress</p>));
    };

    getPrograms = () => {
        const { myPrograms } = this.state;
        const ids = myPrograms.map((p) => p._id);
        firebaseClient()
            .db.collection("program")
            .where("_id", "in", ids)
            .get()
            .then((docs) => {
                let programs = [];
                docs.forEach((doc) => programs.push(doc.data()));
                this.setState({ programs });
            });
    };

    componentWillUnmount() {
        if (this.state.removeMyProgramsListener) {
            this.state.removeMyProgramsListener();
        }
    }
}
