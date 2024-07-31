import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { RxUpdate } from 'react-icons/rx';
import { TiDelete } from 'react-icons/ti';
import DeleteCampaignModal from '../../../../components/Modal/DeleteCampaignModal';
import UpdateCampaignModal from '../../../../components/Modal/UpdateCampaignModal';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyCampaignRow = ({  campaign, handleDelete, refetch }) => {
  const axiosSecure = useAxiosSecure()

    // for Delete Modal
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
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
    refetch()

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='text-center mb-4'>
        <div className='mb-3'>
            <p className='text-gray-900 text-xl font-bold whitespace-no-wrap'>{campaign?.campaign_name}</p>
          </div>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={campaign?.pet_image}
                className='mx-auto object-cover rounded h-24 w-34 '
              />
            </div>
          </div>
          
        </div>
      </td>
      {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{campaign?.pet_name}</p>
      </td> */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{campaign?.lastDate}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 font-bold whitespace-no-wrap'>${campaign?.maxDonation}.00</p>
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {
          matchingProgress?.totalDonate > 0 ?
          <p className='text-gray-900 font-bold whitespace-no-wrap'>${matchingProgress?.totalDonate}.00</p> : 0
        }
      </td>
     
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {
          matchingProgress?.totalDonate > 0 ?
          <button 
            disabled >
          </button> 
          :
          <button
          onClick={() => setIsOpen(true)}
           className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-100 opacity-50 rounded-lg '
              ></span>
              <span className='relative text-4xl text-red-500'> <TiDelete /></span>
          </button>
        }
        {/* Delete modal */}
        <DeleteCampaignModal isOpen={isOpen} closeModal={closeModal}
        handleDelete={handleDelete}
        id={campaign?._id}
         />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button 
        onClick={() => setIsEditModalOpen(true)}
        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-100 opacity-50 rounded-lg'
          ></span>
          <span className='relative text-3xl font-bold text-green-500'> <RxUpdate /></span>
        </button>
        {/* Update Modal */}
        <UpdateCampaignModal 
        pet={campaign}
        refetch={refetch}
        isOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  )
}

MyCampaignRow.propTypes = {
  pet: PropTypes.object,
  refetch: PropTypes.func,
}

export default MyCampaignRow;