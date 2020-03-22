const functions = require("firebase-functions");
const paypal = require("paypal-rest-sdk");
const admin = require("firebase-admin");

admin.initializeApp();
paypal.configure({
    mode: "sandbox", // sandbox or live
    client_id:
        "AUv1gN1i4Km3QRueK12Kx58On4vFAgsgYarnF0lg5wVnvG-TOsNNAnYhwdRY_kcfS25x3gRYViBcpiVU",
    client_secret:
        "EMBz_3m0DT0xNfPufyh2eZwKF6LaNzJ5CgZS2H_8mWPO2hKv5vAUreVRcEVUiv6OZOGarBRpN_F9AJWg",
});

/**
 * Expected in the body the amount
 * Set up the payment information object
 * Initialize the payment and redirect the user to the PayPal payment page
 */

exports.pay = functions.https.onRequest((req, res) => {
    // 1.Set up a payment information object, Build PayPal payment request
    const payReq = JSON.stringify({
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `${req.protocol}://${req.get("host")}/pay/process`,
            cancel_url: `${req.protocol}://${req.get("host")}/pay/cancel`,
        },
        transactions: [
            {
                amount: {
                    total: req.body.price,
                    currency: "USD",
                },
                // This is the payment transaction description. Maximum length: 127
                description: req.body.uid, // req.body.id
                // reference_id string .Optional. The merchant-provided ID for the purchase unit. Maximum length: 256.
                // reference_id: req.body.uid,
                custom: req.body.uid,
                // soft_descriptor: req.body.uid
                // "invoice_number": req.body.uid,A
            },
        ],
    });

    // 2.Initialize the payment and redirect the user.
    paypal.payment.create(payReq, (error, payment) => {
        const links = {};
        if (error) {
            console.error(error);
            res.status("500").end();
        } else {
            // Capture HATEOAS links
            payment.links.forEach(linkObj => {
                links[linkObj.rel] = {
                    href: linkObj.href,
                    method: linkObj.method,
                };
            });
            // If redirect url present, redirect user
            if (Object.prototype.hasOwnProperty.call(links, "approval_url")) {
                // REDIRECT USER TO links['approval_url'].href
                console.info(links.approval_url.href);
                // res.json({"approval_url":links.approval_url.href});
                res.redirect(302, links.approval_url.href);
            } else {
                console.error("no redirect URI present");
                res.status("500").end();
            }
        }
    });
});

// 3.Complete the payment. Use the payer and payment IDs provided in the query string following the redirect.
exports.process = functions.https.onRequest(async (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = {
        payer_id: req.query.PayerID,
    };

    const r = await paypal.payment.execute(
        paymentId,
        payerId,
        (error, payment) => {
            if (error) {
                console.error(error);
                res.redirect(`${req.protocol}://${req.get("host")}/pay/error`); // replace with your url page error
            } else {
                if (payment.state === "approved") {
                    console.info(
                        "payment completed successfully, description: ",
                        payment.transactions[0].description,
                    );
                    // console.info('req.custom: : ', payment.transactions[0].custom);
                    // set paid status to True in RealTime Database
                    const date = Date.now();
                    const uid = payment.transactions[0].description;
                    const ref = admin.database().ref("users/" + uid + "/");
                    ref.push({
                        paid: true,
                        // 'description': description,
                        date: date,
                    });
                    res.redirect(
                        `${req.protocol}://${req.get("host")}/pay/success`,
                    ); // replace with your url, page success
                } else {
                    console.warn("payment.state: not approved ?");
                    // replace debug url
                    res.redirect(
                        `https://console.firebase.google.com/project/${process.env.GCLOUD_PROJECT}/functions/logs?search=&severity=DEBUG`,
                    );
                }
            }
        },
    );
    console.info("promise: ", r);
});
