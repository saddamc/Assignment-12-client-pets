import { Helmet } from "react-helmet-async";
import { BiMoney } from "react-icons/bi";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import usePayment from "../../../hooks/usePayment";


const MyDonation = () => {
  const {user} = useAuth()

  const [payments, refetch, isLoading] = usePayment()

  const totalPayment = payments.reduce((total, item) => {
    const paymentValue = parseFloat(item?.payment) || 0;
    return total + paymentValue;
  }, 0);
  console.log(payments)
  



      if (isLoading) return <LoadingSpinner />
      
    

    return (
        <>
      <Helmet> 
        <title>My Donations | Dashboard</title>
      </Helmet>
      <div className="flex gap-12  mb-8 items-center justify-center  py-4 font-bold">
                <div className="flex  w-[400px] gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-3xl"><BiMoney /></p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Payment History</h2>
                        <p className="text-2xl">{payments.length} </p>
                    </div>
                </div>
                <div className="flex w-[400px] gap-12 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-orange-400 rounded-lg shadow-lg font-bold text-2xl">$</p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Payment Amount</h2>
                        <p className="text-2xl">$ {totalPayment}.00 </p>

                    </div>
                </div>


               
            </div>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
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
                        className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Campaign Name
                      </th>
                    <th
                        scope='col'
                        className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                        Date & Time
                      </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                     transaction Id
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Amount
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
                      Payment Note
                    </th>
                   
                  </tr>
                </thead>

                {/* Donation row data */}
                <tbody> 
                    { 
                      payments.map((item, index) => (
                    <tr key={item._id}>
                      
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{index + 1}</p>
                      </td>

                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.campaignName}</p>
                      </td>

                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-black whitespace-no-wrap font-bold'>
                        <span className="text-red-500"> Date:</span> {item?.date.split('T')[0]}<br />
                        <span className="text-red-500"> Time:</span> {item?.date.split('T')[1].split('.')[0]}<br />
                        </p>
                      </td>
                     
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.transactionId}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>${item?.payment}.00</p>
                      </td>

                      {/* Payment Status */}
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                        <p 
                        className='text-gray-900 whitespace-no-wrap'>
                    
                        <div>
                          {item?.status === 'success' ? <span className='bg-green-500 text-white font-bold px-5 py-2 rounded-lg'>Succeeded</span> : <span className='bg-red-400 text-white font-bold px-3 py-2 rounded-lg '>Pending</span>}
                        </div>
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.note}</p>
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
    </>
    );
};

export default MyDonation;