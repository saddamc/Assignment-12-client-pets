import { Helmet } from "react-helmet-async";
import { BsCartPlusFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDonate from "../../../hooks/useDonate";


const MyDonation = () => {
  const [donate, refetch, isLoading] = useDonate()
  // if here 040002500150 but result is $750.00 so need to use parseFloat
  const totalDonate = donate.reduce((total, item) => {
    const donateValue = parseFloat(item?.Donate) || 0;
    return total + donateValue;
  }, 0);
  const axiosSecure = useAxiosSecure();
  
  console.log(donate)

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
      <Helmet> 
        <title>My Donations | Dashboard</title>
      </Helmet>
      <div className="flex gap-12  mb-8 items-center  py-4 font-bold">
                <div className="flex  w-4/12 gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><BsCartPlusFill /></p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Donate  </h2>
                        <p className="text-2xl">{donate.length} </p>
                    </div>
                </div>
                <div className="flex w-4/12 gap-12 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-orange-400 rounded-lg shadow-lg font-bold text-xl">$</p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Donate Amount</h2>
                        <p className="text-2xl">$ {totalDonate}.00 </p>

                    </div>
                </div>


                <div className=" w-4/12 text-center ">
                   {
                    donate?.length ?
                    <Link to='/dashboard/payment'>
                    <button
                     className="btn bg-[#f7af29] h-[55px] rounded-lg w-24 font-bold text-xl 
                      text-center justify-center items-center shadow-lg"> $PAY
                    </button>
                   </Link> :
                    <button disabled
                    className="btn bg-[#bebebd] h-[55px] opacity-60 rounded-lg w-24 font-bold text-xl 
                     text-center justify-center items-center shadow-lg"> $PAY
                    </button>
                   }
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
                        Campaign Image
                      </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                     Contributor name
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
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <div className='block relative'>
                            <img
                              alt='profile'
                              src={item?.pet_image}
                              className='mx-auto object-cover rounded h-10 w-15 '
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>{item?.cardHolder}</p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap font-bold'>${item?.Donate}.00</p>
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
    </>
    );
};

export default MyDonation;