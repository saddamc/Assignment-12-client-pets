import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDonate from "../../../hooks/useDonate";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [donate, refetch, isLoading] = useDonate();
    const navigate = useNavigate();
    
    const totalDonate = donate.reduce((total, item) => {
        const donateValue = parseFloat(item?.Donate) || 0;
        return total + donateValue;
    }, 0);
    
    useEffect(() => {
        if (totalDonate > 0) {
            axiosSecure.post('/create-payment-intent', { donate: totalDonate })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalDonate]);

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

        Swal.fire({
            title: "Are you sure?",
            text: "You want donate! click 'Donate'",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22C55E",
            cancelButtonColor: "#d33",
            confirmButtonText: `<span style="color: yellow; font-weight: bold; font-size: 18px;">$${totalDonate}.00 Donate</span>`
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Confirm payment only if user confirms
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
                    console.log('confirm error');
                } else {
                    console.log('payment intent', paymentIntent);
                    if (paymentIntent.status === 'succeeded') {
                        console.log('transaction id', paymentIntent.id);
                        setTransactionId(paymentIntent.id);

                        // Save the payment in the database
                        const payment = {
                            email: user.email,
                            payment: totalDonate,
                            transactionId: paymentIntent.id,
                            date: new Date(), // utc date convert. use moment js to 
                            donateIds: donate.map(item => item._id),
                            campaignIds: donate.map(item => item.campaignId),
                            note: donate.map(item => item.note || '').join(', '),
                            status: 'success'
                        };
                        console.log(payment)

                        try {
                            const res = await axiosSecure.post('/payments', payment);
                            console.log('payment saved', res.data);
                            refetch();

                            if (res.data?.paymentResult?.insertedId) {
                                Swal.fire({
                                    // position: "top-end",
                                    icon: "success",
                                    title: "Thank you for the Donation",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                navigate('/dashboard/my-donations');
                            }
                        } catch (error) {
                            console.error('Error saving payment:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong with your payment!'
                            });
                        }
                    }
                }
            } else {
                console.log('Payment canceled by user');
            }
        });
    };

    if (isLoading) return <LoadingSpinner />

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
            <div className="flex mt-4 mx-auto justify-center border-t  gap-2">
                <p className="text-lg text-yellow-300 shadow-sm bg-black px-4 mt-4 font-bold py-1">
                    <span className="text-white">Donate:</span> ${totalDonate}.00 
                </p>
                {
                    donate.length ?
                    <button disabled={!stripe || !clientSecret}
                        className="bg-[#22C55E] text-yellow-200 text-lg mt-4 shadow-md font-bold px-4 py-1  rounded-lg" type="submit">
                        PAY
                    </button>
                    :
                    <button disabled 
                        className="bg-[#bebebd] opacity-60 text-white text-lg mt-4 shadow-md font-bold px-4 py-1  rounded-lg" type="submit">
                        PAY
                    </button>
                }
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
