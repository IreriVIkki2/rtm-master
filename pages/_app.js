import React from "react";
import App from "next/app";
import { firebaseClient, firebase } from "../utils/firebaseClient";
import crud from "../utils/crud";
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
            auth: false,
        };
    }

    addProfileListener = async uid => {
        console.log("uid", uid);
        let removeProfileListener = await firebaseClient()
            .db.collection("profiles")
            .doc(uid)
            .onSnapshot(doc => {
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
        firebaseClient().auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
                return user
                    .getIdToken()
                    .then(token => {
                        return fetch("/api/login", {
                            method: "POST",
                            headers: new Headers({
                                "Content-Type": "application/json",
                            }),
                            credentials: "same-origin",
                            body: JSON.stringify({ token }),
                        });
                    })
                    .then(() => console.log("add listener"));
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

        return (
            <Layout
                context={{
                    user,
                    auth,
                    profile: user && profile,
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
        console.log(
            "handleEmailAndPasswordRegister -> displayName",
            displayName,
        );
        firebaseClient()
            .auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile({
                        ...result.user,
                        displayName,
                    }).then(profile => {
                        localStorage.setItem(
                            "profile",
                            JSON.stringify(profile),
                        );
                        this.setState({ profile });
                    });
                }
            })
            .catch(error => {
                const errorCode = error.code;
                if (errorCode && errorCode === "auth/email-already-in-use") {
                    return alert(errorCode);
                }
            });
    };

    handleEmailAndPasswordLogin = (email, password) => {
        firebaseClient()
            .auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log("handleEmailAndPassword -> result", result);
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
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
            .then(result => {
                if (result.additionalUserInfo.isNewUser) {
                    crud.createUserProfile(result.user).then(profile => {
                        localStorage.setItem(
                            "profile",
                            JSON.stringify(profile),
                        );
                        this.setState({ profile });
                    });
                }
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                console.log("handleGoogleLogin -> errorCode", errorCode);
                var errorMessage = error.message;
                console.log("handleGoogleLogin -> errorMessage", errorMessage);
                // The email of the user's account used.
                var email = error.email;
                console.log("handleGoogleLogin -> email", email);
                if (email) {
                    alert("account already in use");
                }
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log("handleGoogleLogin -> credential", credential);
                // ...
            });
    };

    handleLogout = () => {
        firebaseClient()
            .auth.signOut()
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("profile");
            })
            .catch(error => {
                console.log("handleLogout -> error", error);
                // An error happened.
            });
    };

    componentWillUnmount() {
        localStorage.removeItem("profile");
        if (this.state.removeProfileListener) {
            this.state.removeProfileListener();
        }
    }
}
