const { v4: uuid } = require("uuid");

/**
 * @function
 *
 * @returns {Object} This returns an object with set defaults that is then used to create a new program in firestore
 */
const newProgramObject = () => {
    const pid = uuid().replace(/-/g, "");
    return {
        kind: "program",
        _id: pid,
        slug: `_id${pid}`,
        snippet: {
            publishedAt: Date.now(),
            title: `New Project ${pid}`,
            description:
                "Add a brief 140 characters description of the program - This is essential for Search engine optimization ",
            banner: "Main banner of the program",
            tags: [],
            category: "",
            difficulty: "beginner",
        },
        sales: {
            callToAction: "Get shredded now!",
            article: "<p>this is a full article promoting the program</p>",
        },
        plans: {
            basic: {
                discounted: true,
                price: 65,
                offerPrice: 50,
                features: [],
                limitedOffer: true,
                offerExpiryDate: Date.now(),
            },
            premium: {
                discounted: true,
                price: 95,
                offerPrice: 70,
                features: [],
                limitedOffer: true,
                offerExpiryDate: Date.now(),
            },
        },
        status: {
            availability: "private",
            published: false,
            disabled: false,
            isComplete: false,
            publishAt: Date.now(),
            updatedAt: Date.now(),
        },
        contentDetails: {
            daysCount: 60,
            weeksCount: 12,
            routinesCount: 540,
            restDaysCount: 24,
            visitationCount: 12,
            hasPremium: true,
            isFree: false,
        },
        statistics: {
            viewCount: 0,
            cartCount: 0,
            purchaseCount: 0,
            completionCount: 0,
            commentCount: 0,
            basicUsersCount: 0,
            premiumUsersCount: 0,
            reviewsCount: 0,
            reviewAverage: 0.0,
        },
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
