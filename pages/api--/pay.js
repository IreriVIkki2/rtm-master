// import { firebaseClient } from "../../utils/firebaseClient";
// const paypal = require("paypal-rest-sdk");

// export default (req, res) => {
//     return new Promise(async resolve => {
//         const { pid, product, amount } = req.query;
//         const host = req.get("host");
//         const return_url = `${req.protocol}://${host}/programs/${pid}/buy/approve?total=${amount}`;
//         const cancel_url = `${req.protocol}://${host}/programs/${pid}/buy/cancel`;

//         let keys = null;
//         await firebaseClient()
//             .db.collection("paypal")
//             .doc("keys")
//             .get()
//             .then(doc => {
//                 keys = doc.data();
//             })
//             .catch(err => {
//                 throw err;
//             });

//         paypal.configure({
//             mode: "live",
//             client_id: keys.client,
//             client_secret: keys.secret,
//         });

//         const create_payment_json = {
//             intent: "sale",
//             payer: {
//                 payment_method: "paypal",
//             },
//             redirect_urls: { return_url, cancel_url },
//             transactions: [
//                 {
//                     item_list: {
//                         items: [
//                             {
//                                 name: "Rhotimmi Fitness",
//                                 sku: "item",
//                                 price: parseFloat(amount / 100),
//                                 currency: "USD",
//                                 quantity: 1,
//                             },
//                         ],
//                     },
//                     amount: {
//                         currency: "USD",
//                         total: parseFloat(amount / 100),
//                     },
//                     description: product ? product : null,
//                 },
//             ],
//         };

//         paypal.payment.create(create_payment_json, function(error, payment) {
//             if (error) {
//                 res.status(500).json({ message: "Error creating payment" });
//             } else {
//                 payment.links.forEach(link => {
//                     if (link.rel === "approval_url") {
//                         res.status(200).json({ link: link.href });
//                         resolve();
//                     }
//                 });
//             }
//         });
//     });
// };
