const Axios = require("axios");
const qs = require("qs");
import { sandboxKeys } from "../../config/paypal";

export default (req, res) => {
    return new Promise(async resolve => {
        const returnUrl = `${req.protocol}://${req.get("host")}/programs/${
            req.query.pid
        }/buy/approve`;
        const token = await getAccessToken(sandboxKeys);
        const orderUrl = "https://www.sandbox.paypal.com/v2/checkout/orders";
        const data = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: req.query.amount,
                    },
                },
            ],
            application_context: {
                brand_name: "Rhotimmi Fitness",
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

const getAccessToken = keys => {
    const url = "https://www.sandbox.paypal.com/v1/oauth2/token";

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
