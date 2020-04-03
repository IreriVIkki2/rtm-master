const Axios = require("axios");
import { firebaseClient } from "../../utils/firebaseClient";
const qs = require("qs");

export default (req, res) => {
    console.log("req", req);
    return new Promise(async resolve => {
        const { pid, amount, product } = req.query;
        console.log("amount", amount);
        // await Axios.get(
        //     "https://free.currconv.com/api/v7/convert?apiKey=770ee1263ff9693b440f&q=USD_KES&compact=y",
        // )
        const returnUrl = `${req.protocol}://${req.get(
            "host",
        )}/programs/${pid}/buy/approve`;
        const token = await getAccessToken();
        const orderUrl = "https://www.paypal.com/v2/checkout/orders";
        const data = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: Math.floor(parseInt(amount) / 100),
                    },
                },
            ],
            application_context: {
                brand_name: `Rhotimmi Fitness ${
                    product ? " - " + product : null
                }`,
                landing_page: "BILLING",
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                return_url: returnUrl,
            },
            payment_instruction: {
                disbursement_mode: "INSTANT",
            },
        };

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const options = {
            method: "POST",
            url: orderUrl,
            headers,
            data,
        };

        Axios(options)
            .then(response => {
                response.data.links.forEach(link => {
                    if (link.rel === "approve") {
                        res.status(200).json({ link: link.href });
                        return resolve();
                    }
                });
            })
            .catch(err => {
                res.status(500).json({ message: "error", err: err.message });
                return resolve();
            });
    });
};

const getAccessToken = async () => {
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

    if (!keys) throw new Error("Keys not retrieved");
    const url = "https://www.paypal.com/v1/oauth2/token";

    const data = {
        grant_type: "client_credentials",
    };

    const auth = {
        username: keys.client,
        password: keys.secret,
    };

    const options = {
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Credentials": true,
        },
        data: qs.stringify(data),
        auth: auth,
        url,
    };

    return new Promise(async (resolve, reject) => {
        await Axios(options)
            .then(response => {
                resolve(response.data.access_token);
            })
            .catch(err => {
                reject(err);
            });
    });
};
