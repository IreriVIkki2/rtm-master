const Axios = require("axios");
const qs = require("qs");
import { liveKeys } from "../config";
// create subscription

const getAccessToken = keys => {
    const url = "https://api.paypal.com/v1/oauth2/token";

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

module.exports = async ({ email, amount }) => {
    const token = await getAccessToken(liveKeys);
    const url = "https://api.paypal.com/v2/checkout/orders";
    const data = {
        intent: "CAPTURE",
        payer: {
            email_address: email,
        },
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: amount.split(",").join(""),
                },
            },
        ],
        application_context: {
            brand_name: "Rev Lucy Natasha Ministries",
            landing_page: "BILLING",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3000",
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
        url,
        headers,
        data,
    };

    return new Promise((resolve, reject) => {
        Axios(options)
            .then(res => {
                res.data.links.forEach(link => {
                    if (link.rel === "approve") {
                        resolve(link.href);
                    }
                });
            })
            .catch(err => reject(err));
    });
};
