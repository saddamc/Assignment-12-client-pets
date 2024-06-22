import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FcDonate } from "react-icons/fc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [donate, setDonate] = useState(100); // Default donation amount
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (donate > 0) {
            axiosSecure.post('/create-payment-intent', { donate })
                .then(res => {
                    console.log(res.data.client_secret);
                    setClientSecret(res.data.client_secret);
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }, [donate, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
        } else {
            console.log('payment intent', paymentIntent);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="mt-4 flex">
                <input 
                    type="number" 
                    value={donate} 
                    onChange={(e) => setDonate(Number(e.target.value))} 
                    placeholder="Enter donation amount"
                    className="mr-2 px-4 py-1 border rounded"
                />
                <button className='text-4xl flex bg-blue-600 text-center px-4 py-1 font-bold rounded-full text-white hover:bg-rose-500' type="submit" disabled={!stripe || !clientSecret}>
                    <span className='text-xl mr-2'>$Pay</span>
                </button>
            </div>
            <p className="text-red-600">{error}</p>
        </form>
    );
};

export default CheckoutForm;
