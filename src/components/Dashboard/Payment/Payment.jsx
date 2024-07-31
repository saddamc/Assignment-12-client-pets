import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDonate from "../../../hooks/useDonate";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
  
    const [donate, refetch, isLoading] = useDonate()
    // if here 040002500150 but result is $750.00 so need to use parseFloat
    const totalDonate = donate.reduce((total, item) => {
      const donateValue = parseFloat(item?.Donate) || 0;
      return total + donateValue;
    }, 0);
    
      
  
    const handleDelete = id => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete"
      }).then((result) => {
          if (result.isConfirmed) {
              axiosSecure.delete(`/my-donation/${id}`)
                  .then(res => {
                      if (res.data.deletedCount > 0) {
                          refetch();
                          Swal.fire({
                              title: "Deleted!",
                              text: "Your donation delete successfully.",
                              icon: "success"
                          });
                      }
                  })
          }
      });
    }
  
  
        if (isLoading) return <LoadingSpinner />
    return (
       <>
        <div className="text-center mt-6 font-bold pb-12 text-xl px-4 w-[350px] rounded-lg  mx-auto pt-6">
            <p className="text-xl font-normal text-yellow-600 mb-4">- - - Check & Pay the Payment - - -</p>
            <hr />
            <p className=" my-4 text-2xl text-indigo-500 bg-yellow-200 ">MAKE PAYMENT</p>
            <hr />
            
        </div>
        {/* Fetch Donation Data */}
        <div className='w-[850px]  mx-auto  px-4 sm:px-8'>
        <div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow-lg rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th 
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Campaign Name
                    </th>
                    <th
                        scope='col'
                        className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Campaign Image
                      </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Amount
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Payment Note
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold'
                    >
                      Action
                    </th>
                   
                  </tr>
                </thead>

                {/* Donation row data */}
                <tbody>
                    { 
                    donate.map((item, index) => (
                    <tr key={item._id}>
                      
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{index + 1}</p>
                      </td>

                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.campaign_name
                        }</p>
                      </td>
                      
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <div className='block relative'>
                            <img
                              alt='profile'
                              src={item?.campaign_image}
                              className='mx-auto object-cover rounded h-10 w-15 '
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>${item?.Donate}.00</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.note}</p>
                      </td>

                      {/* Payment Status */}
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                        <p 
                        className='text-gray-900 whitespace-no-wrap'>
                    
                        <div>
                          {item?.status === 'success' ? <span className='bg-green-500 text-white font-bold px-5 py-2 rounded-lg'>Success</span> : <span className='bg-red-400 text-white font-bold px-3 py-2 rounded-lg '>Pending</span>}
                        </div>
                        </p>
                      </td>

                      {/* Action Pending or Success */}
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                        <button
                        onClick={() => handleDelete(item._id)}
                          className='relative cursor-pointer inline-block  leading-tight text-2xl text-[#ce3434] font-bold '> <RiDeleteBin5Line />
                        </button>
                      </td>

                    </tr>
                    ))
                    }
               
                </tbody>
               
              </table>
            </div>
          </div>
        </div>
      </div>



        <div className="mt-12 w-[780px] border-4 p-12 mb-12 mx-auto space-">
           
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
        </div>

       </>
    );
};

export default Payment;