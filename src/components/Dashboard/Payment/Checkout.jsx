import axios from "axios";


const Checkout = () => {

    const handleCreatePayment = () => {
        axios.post('http://localhost:5000/create-payment', {
            amount: 10000,
            currency: 'USD',
        })
        .then((res) => {
            console.log(res)
        });
    };

    return (
        <div>
            
        </div>
    );
};

export default Checkout;