import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
    return (
       <>
        <div className="text-center mt-6 font-bold pb-12 text-xl px-4 w-[350px] rounded-lg  mx-auto pt-6">
            <p className="text-sm font-normal text-yellow-600 mb-4">- - - Please pay to Pets - - -</p>
            <hr />
            <p className=" my-4 ">PAYMENT</p>
            <hr />
            
        </div>
        <div className="mt-12 mx-48 space-">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

       </>
    );
};

export default Payment;