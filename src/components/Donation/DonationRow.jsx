import PropTypes from 'prop-types';
import { FcDonate } from "react-icons/fc";
import { Link } from 'react-router-dom';



const DonationRow = ({  campaign, refetch, index, progressData }) => {

  const matchingProgress = progressData.find(data => data?._id === campaign?._id)
  const progressPercentage = matchingProgress ? (matchingProgress.totalDonate / campaign.maxDonation) * 100 : 0;

  const getProgressColor = (percentage) => {
    if(percentage < 30) {
      return 'bg-red-500';
    } else if (percentage >= 30 && percentage < 60) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  }

  const getProgressColorText = (percentage) => {
    if(percentage < 30) {
      return 'text-red-500';
    } else if (percentage >= 30 && percentage < 60) {
      return 'text-yellow-600';
    } else {
      return 'text-green-500';
    }
  }

  const formatPercentage = (percentage) => {
    return percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2);
  };

  const isPaymentComplete = progressPercentage === 100;
  const isDateExpired = new Date(campaign?.lastDate) < new Date();

  refetch();

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
      <p className= {`${getProgressColorText(progressPercentage)} whitespace-no-wrap mb-1 font-bold `}> ${matchingProgress ? matchingProgress.totalDonate : 0}.00</p>
      </td>

        {/* Donation Progress */}
      <td className='px-5 py-2 border-b border-gray-200 bg-white text-sm'>
        
        <div className='w-full bg-gray-300 shadow-md rounded-full h-2.5'>
          <div className={`${getProgressColor(progressPercentage)} h-2.5 rounded-full`} style={{ width: `${progressPercentage}%` }}></div>
        
            <p className= {`${getProgressColorText(progressPercentage)} text-center whitespace-no-wrap mt-1 `}> {formatPercentage(progressPercentage)}% </p>
           
        
        </div>
        
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
       { isPaymentComplete ? (
        <p className='text-green-500 font-bold text-xl text-center'>Completed</p>
       ) : isDateExpired ? (
        <p className='text-red-500 font-bold text-xl text-center'>Expire</p>
       ) : (
        <Link to={`/donation/${campaign?._id}`}>
          <button 
          disabled={isPaymentComplete || isDateExpired}
          className='text-4xl flex bg-[#5186D5] text-center mx-auto px-4 py-1 font-bold rounded-full text-white justify-center items-center hover:bg-rose-500'> <span className='text-xl mr-2'>$Pay</span> <FcDonate /> 
          </button>
        </Link>
        )}
      </td>   
    </tr>    
  )
}

DonationRow.propTypes = {
  pet: PropTypes.object,
  refetch: PropTypes.func,
}

export default DonationRow;