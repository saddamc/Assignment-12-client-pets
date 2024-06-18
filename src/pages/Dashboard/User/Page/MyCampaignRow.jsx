import PropTypes from 'prop-types'
import { useState } from 'react';
import DeleteModal from '../../../../components/Modal/DeleteModal';
import UpdatePetModal from '../../../../components/Modal/UpdatePetModal';

const MyCampaignRow = ({  pet, handleDelete, refetch }) => {

    // for Delete Modal
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={pet?.pet_image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{pet?.pet_name}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{pet?.category}</p>
      </td>
     
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
        onClick={() => setIsOpen(true)}
         className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal isOpen={isOpen} closeModal={closeModal}
        handleDelete={handleDelete}
        id={pet?._id}
         />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button 
        onClick={() => setIsEditModalOpen(true)}
        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </button>
        {/* Update Modal */}
        <UpdatePetModal 
        pet={pet}
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