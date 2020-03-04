import React, { Component } from "react";
import { firebaseClient, firebase } from "../utils/firebaseClient";

export default class Index extends Component {
    static async getInitialProps({ req, query }) {
        const user = req && req.session ? req.session.decodedToken : null;
        return { user };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        };
    }

    async componentDidMount() {
        // if (this.state.user) this.addDbListener();

        await firebaseClient()
            .db.collection("programs")
            .get()
            .then(snapshot => {
                let programs = [];
                snapshot.forEach(doc => {
                    programs.push(doc.data());
                });
                this.setState({ programs });
            })
            .catch(err => {
                throw err;
            });

        auth.onAuthStateChanged(user => {
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
                // .then(res => this.addDbListener()); --- add profile listener
            } else {
                this.setState({ user: null });
                fetch("/api/logout", {
                    method: "POST",
                    credentials: "same-origin",
                });
                // .then(() => this.removeDbListener()); ---- remove profile listener
            }
        });
    }

    render() {
        const { user, programs } = this.state;

        return (
            <div>
                {user ? (
                    <button onClick={this.handleLogout}>Logout</button>
                ) : (
                    <button onClick={this.handleLogin}>Login</button>
                )}
            </div>
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

// addDbListener() {
//     var db = firebase.firestore();
//     let unsubscribe = db.collection("messages").onSnapshot(
//         querySnapshot => {
//             var messages = {};
//             querySnapshot.forEach(function(doc) {
//                 messages[doc.id] = doc.data();
//             });
//             if (messages) this.setState({ messages });
//         },
//         error => {
//             console.error(error);
//         },
//     );
//     this.setState({ unsubscribe });
// }

// removeDbListener() {
//     // firebase.database().ref('messages').off()
//     if (this.state.unsubscribe) {
//         this.state.unsubscribe();
//     }
// }
