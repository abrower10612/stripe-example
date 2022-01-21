const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

const app = express();

app.use(express.json());

app.use(cors());

app.post("/submit-payment", cors(), async (req, res) => {
	let { amount, id } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Lindsey Brower",
			payment_method: id,
			confirm: true
		})

    console.log('payment', payment);

		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
    console.log('error.message', error.message);
		res.json({
			message: "Payment failed",
			success: false
		})
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Connected and listening on port ${PORT} 🔥`));