import { firebaseClient, firebase } from "../utils/firebaseClient";
import { v4 as uuid } from "uuid";

class FirebaseCrud {
    constructor() {
        this.state = {
            message: "this is a testing message",
        };
    }

    /**
     * @param {Date} myDate The date of message
     * @param {string} message The message you want to add
     *
     * @returns {string} this returns a string of your message concatenated with a predefined string
     */
    test(myDate, message) {
        return console.log(this.state.message + " --- " + message);
    }

    /**
     * @method
     *
     * @param {File} file A single file object
     *
     * @returns {string} This returns a downloadable url for the image that you can save to the database as an image url
     */
    uploadFile(file) {
        console.log(file);
        return "image url";
    }

    /**
     * @method
     *
     * @returns {Object} This return a new programs object pre-filled with placeholder values which the admin must replace fully before publishing it as a new program
     */
    createNewProgram() {
        const pid = uuid().replace(/-/g, "");

        let data = {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        };

        const programRef = firebaseClient()
            .db.collection("programs")
            .doc(pid);

        programRef.set(data, { merge: true });

        return pid;
    }
}
module.exports = new FirebaseCrud();
