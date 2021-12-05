const express = require('express');
const cors = require("cors");
const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
const app = express()
require("dotenv").config();

let port = process.env.PORT;
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `http://localhost:${port}/success`,
        fail_url: `http://localhost:${port}/fail`,
        cancel_url: `http://localhost:${port}/cancel`,
        ipn_url: `http://localhost:${port}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)

    sslcz.init(data).then(apiResponse => {
        console.log("data", data)
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
})



app.listen(port, () => {
    console.log(`Server is runnig at http://localhost:${port}`)
})