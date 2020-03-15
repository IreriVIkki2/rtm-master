const { firebaseClient } = require("../utils/firebaseClient");
const {
    newProgramObject,
    newDayObject,
    newRoutineObject,
} = require("./initialObjects");

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
     * @method getALlPrograms This method fetches all the methods from a database and returns only the object that are useful
     *
     * @returns {Promise <[programs]>} This returns a promise which resolves an array of all programs
     */
    getALlPrograms() {
        return new Promise((resolve, reject) => {
            firebaseClient()
                .db.collection("programs")
                .get()
                .then(snapshot => {
                    let programs = [];
                    snapshot.forEach(doc => programs.push(doc.data()));
                    resolve(programs);
                })
                .catch(err => reject(err));
        });
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

    /**
     * @method
     *
     * @param {String} programId the id of the program to which this day belongs
     * @param {Number} order this is the number of day.
     *
     * @returns {Promise} Returns a promise that resolves to a day id
     */
    createNewDay(programId, order) {
        return new Promise(async (resolve, reject) => {
            const newDay = newDayObject();

            newDay.programId = programId;
            newDay.order = order;

            await firebaseClient()
                .db.collection("days")
                .doc(newDay._id)
                .set(newDay)
                .then(() => resolve(newDay._id))
                .catch(err => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

    /**
     * @method
     *
     * @param {String} programId the id of the program to which this day belongs
     * @param {String} programId the id of the program to which this day belongs
     * @param {Number} order this is the number of day.
     *
     * @returns {Promise} Returns a promise that resolves to a day id
     */
    createNewRoutine(programId, dayId, order) {
        return new Promise(async (resolve, reject) => {
            const newRoutine = newRoutineObject();

            newRoutine.programId = programId;
            newRoutine.order = order;
            newRoutine.dayId = dayId;

            await firebaseClient()
                .db.collection("routines")
                .doc(newRoutine._id)
                .set(newRoutine)
                .then(() => resolve(newRoutine._id))
                .catch(err => {
                    console.error(err);
                    return reject(err);
                });
        });
    }
}

module.exports = new FirebaseCrud();
