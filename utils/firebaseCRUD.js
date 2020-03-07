const { firebaseClient } = require("../utils/firebaseClient");
const { newProgramObject } = require("./initialObjects");

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
     * @returns {Promise} This return a promise which resolves to a program id that is then used to query the newly created program from firestore ready for editing.
     */
    createNewProgram() {
        return new Promise(async (resolve, reject) => {
            const newProgram = newProgramObject();

            await firebaseClient()
                .db.collection("programs")
                .doc(newProgram._id)
                .set(newProgram)
                .then(() => resolve(newProgram._id))
                .catch(err => {
                    console.error(err);
                    return reject(err);
                });
        });
    }
}
module.exports = new FirebaseCrud();
