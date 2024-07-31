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
import useDonate from "../../hooks/useDonate";
import LoadingSpinner from "../Shared/LoadingSpinner";
import "./DonationDetails";


const DonationDetails = () => {
    const {id} = useParams()
    const axiosCommon = useAxiosCommon()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const navigate = useNavigate()
    const [donate] = useDonate()

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
        navigate('/payment')
        setLoading(false)
      } 
    })

   

       // Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    if (donate.length >= 1) {
      toast.error("Please complete your payment first, then make another donation.");
      return;
  }
    setLoading(true)
    const form = e.target
    const note = form.note.value
    const Donate = form.Donate.value;
    const campaignId = campaign?._id;
    const campaign_name = campaign?.campaign_name;
    const campaign_image = campaign?.pet_image;
    const status = "waiting for payment";
    const User = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const donateData = {
        note, 
        Donate,  
        campaignId,
        campaign_name,
        campaign_image,
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

  const {data: progressData = [] } = useQuery({
    queryKey: ['progress-stats'],
    queryFn: async () => {
      const {data} = await axiosSecure.get('/progress-stats');
      return data;
    }
  })
  console.log(progressData)


  const matchingProgress = progressData.find(data => data?._id === campaign?._id)

  const remainingDonate = matchingProgress && (campaign.maxDonation - matchingProgress.totalDonate);
  console.log(remainingDonate)

  const [donationAmount, setDonationAmount] = useState()

  const handleMaxButton = () => {
    setDonationAmount(remainingDonate)
  }

  const handleDonationChange = (e) => {
    setDonationAmount(Math.min(e.target.value, remainingDonate))
  }






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
                        <img src={campaign?.pet_image} className="w-[240px] h-[200px] rounded-md "  alt="" />
                    </div>
                    <div className="space-y-1 py-4">
                        <p className="font-bold"><span className="text-red-400">Campaign:</span> {campaign?.campaign_name} </p>
                        <p className="opacity-50">{campaign?.shortDescription} </p>
                        <p className="opacity-50">Last Date: {campaign?.lastDate} </p>
                        <p className="font-extrabold "> <span className="text-red-400">Funding Target:</span> $ {campaign?.maxDonation}.00 </p>
                        <div>
                          <p className="font-extrabold "> <span className="text-green-500">Donation collected:</span> $ {matchingProgress?.totalDonate}.00 </p>
                        </div>
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

             {/* Donation Note */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
               Donation Note
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md '
                type="text"
                id="note"
                name="note"
                placeholder="Note"
                required
              />
            </div>

      {/* Donation Amount */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='Donate' className='block text-gray-600'>
                Donate Amount
              </label>
              <input
                className='w-1/4 px-4 py-3 relative text-gray-800 border border-green-300 focus:outline-green-500  rounded-md '
                type="number"
                id="Donate"
                name="Donate"
                placeholder="$"
                max={remainingDonate}
                value={donationAmount}
                onChange={handleDonationChange}
                required
              /> 
                <button onClick={handleMaxButton} className="absolute pt-3.5 pb-3.5 -ml-10 z-10  rounded-md text-xs font-semibold">MAX</button>
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