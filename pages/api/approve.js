import { firebaseClient } from "../../utils/firebaseClient";
const paypal = require("paypal-rest-sdk");

export default (req, res) => {
    return new Promise(async resolve => {
        const { paymentId, token, PayerID, total } = req.query;
        console.log("req.query", req.query);
        let keys = null;
        await firebaseClient()
            .db.collection("paypal")
            .doc("keys")
            .get()
            .then(doc => {
                keys = doc.data();
            })
            .catch(err => {
                throw err;
            });

        paypal.configure({
            mode: "live",
            client_id: keys.client,
            client_secret: keys.secret,
        });

        var execute_payment_json = {
            payer_id: PayerID,
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total,
                    },
                },
            ],
        };

        paypal.payment.execute(paymentId, execute_payment_json, function(
            error,
            payment,
        ) {
            if (error) {
                res.status(500).json({ message: "Error executing payment" });
                resolve();
            } else {
                res.status(200).json({ payment });
                resolve();
            }
        });
    });
};
