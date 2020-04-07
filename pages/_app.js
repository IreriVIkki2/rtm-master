import React from "react";
import App from "next/app";
import { firebaseClient, firebase } from "../utils/firebaseClient";
import crud from "../utils/crud";
import fetch from "isomorphic-unfetch";
import "react-quill/dist/quill.snow.css";
import "../public/main.css";
import Layout from "../components/Layout";
import Router from "next/router";

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
            auth: false,
        };
    }

    addProfileListener = async (uid) => {
        let removeProfileListener = await firebaseClient()
            .db.collection("profiles")
            .doc(uid)
            .onSnapshot((doc) => {
                localStorage.setItem("profile", JSON.stringify(doc.data()));
                this.setState({
                    removeProfileListener,
                    profile: doc.data(),
                    auth: true,
                });
            });
    };

    componentDidMount() {
        const { user } = this.state;
        if (user) this.addProfileListener(user.uid);
        firebaseClient().auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                return user.getIdToken().then((token) => {
                    return fetch("/api/login", {
                        method: "POST",
                        headers: new Headers({
                            "Content-Type": "application/json",
                        }),
                        credentials: "same-origin",
                        body: JSON.stringify({ token }),
                    });
                });
                // .then(() => {});
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
        const { Component } = this.props;
        const { user, profile, auth } = this.state;

        if (user && !profile) {
            return null;
        }

        return (
            <Layout
                context={{
                    user,
                    auth,
                    profile,
                    googleLogin: this.handleGoogleLogin,
                    facebookLogin: this.handleFacebookLogin,
                    emailAndPasswordLogin: this.handleEmailAndPasswordLogin,
                    emailAndPasswordRegister: this
                        .handleEmailAndPasswordRegister,
                    signOut: this.handleLogout,
                }}
            >
                <Component />
            </Layout>
        );
    }

    handleEmailAndPasswordRegister = (email, password, displayName) => {
        firebaseClient()
            .auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile({
                        ...result.user,
                        displayName,
                    }).then((profile) => {
                        localStorage.setItem(
                            "profile",
                            JSON.stringify(profile),
                        );
                        this.setState({ profile });
                    });
                }
                Router.replace("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode && errorCode === "auth/email-already-in-use") {
                    alert("Email already in use");
                }
            });
    };

    handleEmailAndPasswordLogin = (email, password) => {
        firebaseClient()
            .auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                Router.replace("/");
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Could not log you in, Try again");
                // ...
            });
    };

    handleFacebookLogin = () => {
        firebaseClient().auth.signInWithPopup(
            new firebase.auth.FacebookAuthProvider(),
        );
    };

    handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
        firebaseClient()
            .auth.signInWithPopup(provider)
            .then((result) => {
                console.log("handleGoogleLogin -> result", result);
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile(result.user).then((profile) => {
                        localStorage.setItem(
                            "profile",
                            JSON.stringify(profile),
                        );
                        this.setState({ profile });
                    });
                }
                Router.replace("/");
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                console.log("handleGoogleLogin -> errorCode", errorCode);
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                if (email) {
                    alert("Email already in use");
                }
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                Router.replace("/");
                // ...
            });
    };

    handleLogout = () => {
        firebaseClient().auth.signOut();
        window.localStorage.clear();
        window.sessionStorage.clear();
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/",
                );
        });
        this.setState({ auth: false, user: null, profile: null });
        // window.location.reload();
    };

    componentWillUnmount() {
        localStorage.removeItem("profile");
        if (this.state.removeProfileListener) {
            this.state.removeProfileListener();
        }
    }
}
