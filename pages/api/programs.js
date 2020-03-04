import { firebaseClient } from "../../utils/firebaseClient";

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            let programs = [];
            await firebaseClient()
                .db.collection("programs")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        programs.push(doc.data());
                    });
                })
                .catch(err => {
                    res.status(405).end(err);
                });
            res.status(200).json({ programs });
            break;
        case "POST":
            //...
            break;
        default:
            res.status(405).end({ message: "Method Not Allowed" });
            break;
    }
};
