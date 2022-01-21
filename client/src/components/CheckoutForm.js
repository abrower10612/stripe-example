import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import Spinner from 'react-spinners/RingLoader';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "2.5rem",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#000" }
		},
		invalid: {
			iconColor: "#000",
			color: "#ffc7ee"
		}
	}
}

const CheckoutForm = () => {
    const [success, setSuccess ] = useState(false)
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('danger');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:5000/submit-payment", {
                    amount: 1000,
                    id
                });

                console.log('response', response);

                if (response.data.success) {
                    setAlertType('success');
                    setAlert('Payment successful');
                    setSuccess(true)
                }

            } catch (err) {
                setAlertType('danger');
                setAlert(`Error: ${err.message}`);
            }
        }
        setLoading(false);
    }

    const startOver = () => {
        setAlert('');
        setSuccess(false);
    }

    return (
        <>
            { alert.length > 0 && <Alert variant={alertType}>{alert}</Alert> }
            {
                !success ?
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>Submit Payment</button>
                </form>
                :
                <button onClick={() => startOver()}>Back to payment page</button>
            }
            { loading && 
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        backgroundColor: '#000',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        opacity: 0.6
                    }}
                >
                    <Spinner 
                        color="white"
                        style={{ 
                            position: 'absolute'
                         }}
                    /> 
                </div>
            }
        </>
    );
};

export default CheckoutForm;
