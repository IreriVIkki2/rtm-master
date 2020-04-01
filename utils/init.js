const { v4: uuid } = require("uuid");

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

        daysCount: 60,
        weeksCount: 12,
        routinesCount: 540,
        restDaysCount: 24,
        visitationCount: 12,
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
const newDayObject = pid => {
    const dayId = uuid().replace(/-/g, "");
    return {
        kind: "exercise/day",
        _id: dayId,
        order: 0,
        programId: pid,
        plan: "premium",
        isRestDay: false,
        lengthInSecs: 12000,
        published: false,
        publishAt: Date.now(),
        updatedAt: Date.now(),
        viewCount: 0,
        completionCount: 0,
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
const newRoutineObject = (pid, dayId) => {
    const rid = uuid().replace(/-/g, "");
    return {
        kind: "routine",
        _id: rid,
        order: 0,
        programId: pid,
        dayId: dayId,
        plan: "all",
        isRestDay: false,
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
    newDayObject,
    newRoutineObject,
};
