import { firebaseClient } from "../../../utils/firebaseClient";

export default async (req, res) => {
    let result = null;
    let status = 200;
    const { pid } = req.query;
    switch (req.method) {
        case "GET":
            let page = {};
            await firebaseClient()
                .db.collection(pid)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        page[doc.id] = doc.data().value;
                    });
                    result = page;
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
    return res.status(status).json({ page: result });
};
