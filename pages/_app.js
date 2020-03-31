import React from "react";
import App from "next/app";
import { firebaseClient, firebase } from "../utils/firebaseClient";
import fetch from "isomorphic-unfetch";
import "react-quill/dist/quill.snow.css";
import "../public/main.css";
import Layout from "../components/Layout";

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
        const { Component } = this.props;
        const { user, profile, mounted } = this.state;

        return (
            <Layout
                context={{
                    user,
                    profile: user && profile,
                    isAdmin: true,
                    signIn: this.handleLogin,
                    signOut: this.handleLogout,
                }}
            >
                <Component />
            </Layout>
        );
    }

    handleLogin() {
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
