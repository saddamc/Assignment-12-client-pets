import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteAdoptModal from '../../../../components/Modal/DeleteAdoptModal'
import { TiDelete } from 'react-icons/ti'

const MyAdoptRow = ({  adopt, handleDelete, refetch }) => {
    // for Delete Modal
    let [isOpen, setIsOpen] = useState(false)
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
                src={adopt?.pet_image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{adopt?.pet_name}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{adopt?.category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{adopt?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{adopt?.age} Year</p>
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
        onClick={() => setIsOpen(true)}
         className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-100 opacity-50 rounded-lg '
            ></span>
            <span className='relative text-4xl text-red-500'> <TiDelete /></span>
        </button>
        {/* Delete modal */}
        <DeleteAdoptModal isOpen={isOpen} closeModal={closeModal}
        handleDelete={handleDelete}
        id={adopt?._id}
         />
      </td>
      
    </tr>
  )
}

MyAdoptRow.propTypes = {
  adopt: PropTypes.object,
  refetch: PropTypes.func,
}

export default MyAdoptRow;