const clientCredentials = require("../config/client");
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

module.exports = {
    firebaseClient: () => {
        try {
            firebase.initializeApp(clientCredentials);
        } catch (err) {
            if (!/already exists/.test(err.message)) {
                console.error("Firebase initialization error", err.stack);
            }
        }

        return {
            db: firebase.firestore(),
            storage: firebase.storage(),
            auth: firebase.auth(),
        };
    },
    firebase,
    FieldValue,
};
