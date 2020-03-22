import React, { Fragment } from "react";
import App from "next/app";
import UserContext from "../context/UserContext";
import { firebaseClient, firebase } from "../utils/firebaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fetch from "isomorphic-unfetch";
import "react-quill/dist/quill.snow.css";
import "../public/main.css";

export default class MyApp extends App {
    static async getInitialProps({ ctx }) {
        const { req } = ctx;
        const user = req && req.session ? req.session.decodedToken : null;
        return { user };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            profile: null,
            mounted: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.addProfileListener = this.addProfileListener.bind(this);
    }

    async addProfileListener(uid) {
        let removeProfileListener = await firebaseClient()
            .db.collection("profiles")
            .doc(uid)
            .onSnapshot(doc => {
                this.setState({
                    removeProfileListener,
                    profile: doc.data(),
                    mounted: true,
                });
            });
    }

    componentDidMount() {
        const { user } = this.state;
        if (user) this.addProfileListener(user.uid);
        firebaseClient().auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
                return user.getIdToken().then(token => {
                    return fetch("/api/login", {
                        method: "POST",
                        headers: new Headers({
                            "Content-Type": "application/json",
                        }),
                        credentials: "same-origin",
                        body: JSON.stringify({ token }),
                    });
                });
            } else {
                this.setState({ user: null, mounted: true });
                fetch("/api/logout", {
                    method: "POST",
                    credentials: "same-origin",
                });
            }
        });
    }

    render() {
        const { Component, pageProps } = this.props;
        const { user, profile, mounted } = this.state;

        return (
            <Fragment>
                <UserContext.Provider
                    value={{
                        user,
                        profile: user && profile,
                        isAdmin: true,
                        signIn: this.handleLogin,
                        signOut: this.handleLogout,
                    }}
                >
                    <Navbar />
                    <div>
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </UserContext.Provider>
            </Fragment>
        );
    }

    handleLogin() {
        console.log("login");
        firebaseClient().auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider(),
        );
    }

    handleLogout() {
        firebaseClient().auth.signOut();
    }

    componentWillUnmount() {
        if (this.state.removeProfileListener) {
            this.state.removeProfileListener();
        }
    }
}
