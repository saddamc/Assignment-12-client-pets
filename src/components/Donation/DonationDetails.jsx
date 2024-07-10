import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiIdCard, BiSolidDetail } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import "./DonationDetails";


const DonationDetails = () => {
    const {id} = useParams()
    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const navigate = useNavigate()

    const [cardDetails, setCardDetails] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [Donate, setDonate] = useState('');
    const [loading, setLoading] = useState(false)

    const { data: campaign = {}, isLoading } = useQuery({
        queryKey: [ 'campaign', id ],
        queryFn: async () => {
            const {data} = await axiosCommon.get(`/campaign/${id}`)
            return data
        }
    })
    console.log(campaign)

    // payment data send in server
    const {mutateAsync} = useMutation({
      mutationFn: async donateData => {
        const {data} = await axiosSecure.post('/donation', donateData)
        return data;
      },
      onSuccess: () =>{
        console.log('Donation Saved Successfully')
        toast.success('Donation Added Successfully')
        navigate('/dashboard/my-donations')
        setLoading(false)
      } 
    })
   

       // Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const email = form.email.value
    const cardHolder = form.cardHolder.value;
    const cardDetails = form.cardDetails.value;
    const expiryDate = form.expiryDate.value;
    const cvc = form.cvc.value;
    const Donate = form.Donate.value;
    const donateId = campaign?._id;
    const pet_image = campaign?.pet_image;
    const status = "pending";
    const User = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const donateData = {
        email, 
        cardHolder, 
        cardDetails, 
        expiryDate, 
        cvc, 
        Donate,  
        donateId,
        pet_image,
        status,
        User
      }
      console.table(donateData)

      // Post request to server
      await mutateAsync(donateData)

    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  
  }





      // form digit dynamic
      const formatCardNumber = (value) => {
        return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1-').substr(0, 19);
    };

    const handleCardDetailsChange = (e) => {
        const formattedCardNumber = formatCardNumber(e.target.value);
        setCardDetails(formattedCardNumber);

        if (formattedCardNumber.replace(/-/g, '').length >= 16) {
            document.getElementById('expiry-date').focus();
        }
    };

    const formatExpiryDate = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length <= 2) {
            return cleanedValue;
        } else if (cleanedValue.length <= 4) {
            return `${cleanedValue.substr(0, 2)}/${cleanedValue.substr(2, 2)}`;
        } else {
            return `${cleanedValue.substr(0, 2)}/${cleanedValue.substr(2, 2)}`;
        }
    };

    const handleExpiryDateChange = (e) => {
        const formattedExpiryDate = formatExpiryDate(e.target.value);
        setExpiryDate(formattedExpiryDate);

        if (formattedExpiryDate.length >= 5) {
            document.getElementById('cvv').focus();
        }
    };

    const handleCVCChange = (e) => {
        const cleanedValue = e.target.value.replace(/\D/g, '').substr(0, 3);
        setCvc(cleanedValue);
    };

    const handleDonationAmountChange = (e) => {
      const cleanedValue = e.target.value.replace(/[^\d.]/g, '');
      const formattedValue = cleanedValue ? `$${parseFloat(cleanedValue).toFixed(2)}` : '';
      setDonate(formattedValue);
  };



    

    if(isLoading) return <LoadingSpinner />


    return (
        <div className="max-w-screen-2xl lg:flex md:flex px-12 mx-auto gap-10 ">
            {/* left Side: Campaign Details*/}
            <div className="w-[98%] ">
            <div className="bg-stone-400 p-2 my-8 rounded-lg shadow-lg">
            <div className="flex gap-2 items-center text-3xl text-black font-extrabold ">
                <p className="text-white"> <BiSolidDetail /> </p>
                <p className="text-white">Campaign  </p>
                <h2 >Summary</h2>
            </div>
                <h4 className="opacity-40 text-sm ml-10 mt-2">Donation Campaign Details</h4>
            </div>
                <div className="flex gap-6  border-2 rounded-md ">
                    <div>
                        <img src={campaign?.pet_image} className="w-[200px] h-[160px] rounded-md "  alt="" />
                    </div>
                    <div className="space-y-1 py-4">
                        <p className="font-bold"><span className="text-red-400">Campaign:</span> {campaign?.campaign_name} </p>
                        <p className="opacity-50">{campaign?.shortDescription} </p>
                        <p className="opacity-50">Last Date: {campaign?.lastDate} </p>
                        <p className="font-extrabold "> <span className="text-red-400">Collection Target:</span> $ {campaign?.maxDonation}.00 </p>
                    </div>
                </div>
                <div>
                    
                </div>

            </div>
            {/* Right Side: Donator Details*/}
            <div className='w-full  px-4 justify-center items-center text-gray-800 rounded-xl bg-gray-200'>
      <form onSubmit={handleSubmit}>
      <div className="bg-green-500 p-2 my-8 rounded-lg shadow-lg">
      <div className="flex gap-2 items-center text-3xl text-black font-extrabold ">
        <p className="text-white"> <BiIdCard /> </p>
        <p className="text-white">Payment  </p>
        <h2 >Details</h2>
      </div>
        <h4 className="opacity-40 text-sm ml-10 mt-2">Complete your Donate by providing your payment details</h4>
      </div>
      {/* start */}
        <div>
         
          <div className='space-y-2'>

             {/* Email */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Email
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                type="email"
                id="email"
                name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

             {/* Card Holder */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='cardHolder' className='block text-gray-600'>
                Card Holder
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                type="text"
                id="cardHolder"
                name="cardHolder"
                // value={cardHolder}
                // onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Card Holder"
                required
              />
            </div>

           {/* Card Details */}


            <div className='space-y-1 text-sm'>
              <label htmlFor='card-details' className='block text-gray-600'>
                Card Details
              </label>
              <input
                className='w-1/2 px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500  rounded-md '
                type="text"
                id="cardDetails"
                name="cardDetails"
                value={cardDetails}
                onChange={handleCardDetailsChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
              />
              

            <input
                className='w-1/4 px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500  rounded-md '
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                required
              />

            <input
                className='w-1/4 px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500  rounded-md '
                type="text"
                id="cvc"
                name="cvc"
                value={cvc}
                onChange={handleCVCChange}
                placeholder="CVC"
                required
            />

            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='Donate' className='block text-gray-600'>
                Donate Amount
              </label>
              <input
                className='w-1/4 px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500  rounded-md '
                type="number"
                id="Donate"
                name="Donate"
                // value={Donate}
                onChange={handleDonationAmountChange}
                placeholder="$"
                required
              />
            </div>

           
           

          </div>
        </div>
        {/* End  */}

        <div className="flex items-center text-green-500 hover:text-yellow-500">
        <p> <IoArrowRedo />  </p>
          <button
            disabled={loading}
            type='submit'
            className='w-[98%] p-2 mt-5 text-center text-white hover:text-black font-bold transition duration-200 rounded shadow-md bg-green-500 mb-6 text-2xl hover:bg-yellow-500'
          >
            {loading ? <ImSpinner9 className='animate-spin m-auto ' /> : 'Donate'}
            
          </button>
          <p> <IoArrowUndo />  </p>
        </div>
      </form>
    </div>
            
        </div>
    );
};


export default DonationDetails;