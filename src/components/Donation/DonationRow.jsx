import PropTypes from 'prop-types';
import { FcDonate } from "react-icons/fc";
import { Link } from 'react-router-dom';



const DonationRow = ({  campaign, refetch, index }) => {

      


  return (
   

    <tr >
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
        <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={campaign?.pet_image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{campaign?.campaign_name}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{campaign?.category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{campaign?.lastDate}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap font-bold'>${campaign?.maxDonation}.00</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {/* add how much donate here */}
        {/* <p className='text-gray-900 whitespace-no-wrap'>${campaign?.maxDonation}.00</p> */}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       <Link to={`/donation/${campaign?._id}`}>
       <button className='text-4xl flex bg-[#5186D5] text-center mx-auto px-4 py-1 font-bold rounded-full text-white justify-center items-center hover:bg-rose-500'> <span className='text-xl mr-2'>$Pay</span> <FcDonate /> </button>
       </Link>
      </td>

       
    </tr>

       

   
    
  )
}

DonationRow.propTypes = {
  pet: PropTypes.object,
  refetch: PropTypes.func,
}

export default DonationRow;