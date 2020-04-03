const paySuccess = {
    id: "PAYID-L2DYHMY4EP69520NL2149343",
    intent: "sale",
    state: "approved",
    cart: "8VM95500CR272264C",
    payer: {
        payment_method: "paypal",
        status: "VERIFIED",
        payer_info: {
            email: "wambsviki@gmail.com",
            first_name: "Victor Ireri",
            last_name: "Wambui",
            payer_id: "5R74QK2DR55Q8",
            shipping_address: {
                recipient_name: "Victor Wambui",
                line1: "2746",
                line2: "Lavington",
                city: "Nairobi",
                state: "Nairobi",
                postal_code: "00202",
                country_code: "KE",
            },
            country_code: "KE",
        },
    },
    transactions: [
        {
            amount: {
                total: "1.00",
                currency: "USD",
                details: {
                    subtotal: "1.00",
                    shipping: "0.00",
                    insurance: "0.00",
                    handling_fee: "0.00",
                    shipping_discount: "0.00",
                },
            },
            payee: {
                merchant_id: "J2GVYX6KZZ5GJ",
                email: "vikkistarks@gmail.com",
            },
            description: "12 week abs-olute program",
            soft_descriptor: "PAYPAL *STARK CORP",
            item_list: {
                items: [
                    {
                        name: "Rhotimmi Fitness",
                        sku: "item",
                        price: "1.00",
                        currency: "USD",
                        tax: "0.00",
                        quantity: 1,
                    },
                ],
                shipping_address: {
                    recipient_name: "Victor Wambui",
                    line1: "2746",
                    line2: "Lavington",
                    city: "Nairobi",
                    state: "Nairobi",
                    postal_code: "00202",
                    country_code: "KE",
                },
            },
            related_resources: [
                {
                    sale: {
                        id: "6MH86982VL8348541",
                        state: "completed",
                        amount: {
                            total: "1.00",
                            currency: "USD",
                            details: {
                                subtotal: "1.00",
                                shipping: "0.00",
                                insurance: "0.00",
                                handling_fee: "0.00",
                                shipping_discount: "0.00",
                            },
                        },
                        payment_mode: "INSTANT_TRANSFER",
                        protection_eligibility: "ELIGIBLE",
                        protection_eligibility_type:
                            "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE",
                        transaction_fee: {
                            value: "0.33",
                            currency: "USD",
                        },
                        receivable_amount: {
                            value: "1.00",
                            currency: "USD",
                        },
                        exchange_rate: "0.009057697533287",
                        parent_payment: "PAYID-L2DYHMY4EP69520NL2149343",
                        create_time: "2020-04-03T18:44:19Z",
                        update_time: "2020-04-03T18:44:19Z",
                        links: [
                            {
                                href:
                                    "https://api.paypal.com/v1/payments/sale/6MH86982VL8348541",
                                rel: "self",
                                method: "GET",
                            },
                            {
                                href:
                                    "https://api.paypal.com/v1/payments/sale/6MH86982VL8348541/refund",
                                rel: "refund",
                                method: "POST",
                            },
                            {
                                href:
                                    "https://api.paypal.com/v1/payments/payment/PAYID-L2DYHMY4EP69520NL2149343",
                                rel: "parent_payment",
                                method: "GET",
                            },
                        ],
                        soft_descriptor: "PAYPAL *STARK CORP",
                    },
                },
            ],
        },
    ],
    failed_transactions: [],
    create_time: "2020-04-03T18:42:58Z",
    update_time: "2020-04-03T18:44:19Z",
    links: [
        {
            href:
                "https://api.paypal.com/v1/payments/payment/PAYID-L2DYHMY4EP69520NL2149343",
            rel: "self",
            method: "GET",
        },
    ],
    httpStatusCode: 200,
};
