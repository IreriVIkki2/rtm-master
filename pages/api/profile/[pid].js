import { firebaseClient } from "../../../utils/firebaseClient";

export default async (req, res) => {
    let result = null;
    let status = 200;
    const { pid } = req.query;
    switch (req.method) {
        case "GET":
            await firebaseClient()
                .db.collection("profiles")
                .doc(pid)
                .get()
                .then(doc => {
                    if (!doc.exists) {
                        status = 404;
                        result = {
                            message: "Profile does not exist",
                        };
                    } else {
                        result = doc.data();
                    }
                })
                .catch(err => {
                    status = 500;
                    result = { message: "Server Error" };
                });
            break;
        case "POST":
            //...
            break;
        default:
            status = 405;
            result = { message: "Method Not Allowed" };
            break;
    }
    return res.status(status).json({ profile: result });
};
