import React, { Fragment } from "react";
import App from "next/app";
import UserContext from "../context/UserContext";
import { firebaseClient, firebase } from "../utils/firebaseClient";
import Navbar from "../components/Navbar";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";
import "react-quill/dist/quill.snow.css";

export default class MyApp extends App {
    static async getInitialProps({ AppTree, Component, router, ctx }) {
        const { req } = ctx;
        const user = req && req.session ? req.session.decodedToken : null;
        const res = user && (await fetch(`${baseUrl}/api/profile/${user.uid}`));
        const profile = res ? await res.json() : null;
        let childProps = {};
        if (Component.getInitialProps) {
            childProps = await Component.getInitialProps(ctx);
        }
        return { user, ...profile, childProps };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            profile: this.props.profile,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
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
                this.setState({ user: null });
                fetch("/api/logout", {
                    method: "POST",
                    credentials: "same-origin",
                });
            }
        });
    }

    render() {
        const { Component, pageProps, childProps } = this.props;
        const { user, profile } = this.state;
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
                    <div style={{ width: "100%", overflow: "hidden" }}>
                        <Component {...pageProps} {...childProps} />
                    </div>
                </UserContext.Provider>
            </Fragment>
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
}
