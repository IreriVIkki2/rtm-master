const { v4: uuid } = require("uuid");

/**
 * @function
 *
 * @param {uid} string Id of the user
 *
 * @returns {Object} This returns a new user profile object
 */
const profile = (user) => {
    return {
        _id: user.uid,

        isAdmin: false,

        displayName: user.displayName,
        photoUrl: user.photoURL,
        fullName: null,
        firstName: null,
        lastName: null,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAnonymous: user.isAnonymous,

        registeredAt: Date.now(),
        updatedAt: Date.now(),
    };
};

/**
 * @function
 *
 * @returns {Object} This returns an object with set defaults that is then used to create a new program in firestore
 */
const newProgramObject = () => {
    const pid = uuid().replace(/-/g, "");
    return {
        _id: pid,
        slug: `_id${pid}`,
        title: `New Project (Untitled)`,
        description:
            "Add a brief 140 characters description of the program - This is essential for Search engine optimization ",
        banner: "Main banner of the program",
        tags: [],
        category: "",
        difficulty: "beginner",
        availability: "private",

        published: false,
        disabled: false,
        isComplete: false,
        publishedAt: Date.now(),
        updatedAt: Date.now(),

        daysCount: 0,
        weeksCount: 0,
        routinesCount: 0,
        restDaysCount: 0,
        visitationCount: 0,
        hasPremium: true,
        isFree: false,
    };
};

/**
 * @function
 *
 * @param {programId} string Id of the associated program
 *
 * @returns {Object} This returns an object with set defaults that is then used to create a new exercise/day in firestore
 */
const dayInit = (order) => {
    const dayId = uuid().replace(/-/g, "");
    return {
        _id: dayId,
        order,
        plan: "premium",
        isRestDay: false,
        lengthInSecs: 0,
        viewCount: 0,
        routinesCount: 0,
    };
};

/**
 * @function
 *
 * @param {programId} string Id of the associated routine
 * @param {dayId} string Id of the day routine
 *
 * @returns {Object} This returns an object with set defaults that is then used to create a new exercise/day in firestore
 */
const routineInit = (order) => {
    const _id = uuid().replace(/-/g, "");
    return {
        _id,
        order,
        lengthInSecs: 0,
        repeatCount: "X 10",
        published: false,
        publishAt: Date.now(),
        viewCount: 0,
        completionCount: 0,
        routinesCount: 0,
        youtubeUrl: "",
        description: "",
        name: "",
    };
};

module.exports = {
    newProgramObject,
    dayInit,
    routineInit,
    profile,
};
