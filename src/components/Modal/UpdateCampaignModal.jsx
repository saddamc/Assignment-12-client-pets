/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { imageUpload } from '../../Api/ImageUpload'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import UpdateCampaignForm from '../Form/UpdateCampaignForm'

const UpdateCampaignModal = ({ setIsEditModalOpen, isOpen, pet, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const [petData, setPetData] = useState(pet)
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')

  //   handle Image update
  const handleImage = async pet_image => {
    setImagePreview(URL.createObjectURL(pet_image))
    setImageText(pet_image.name)
    setLoading(true)
    try {
      // upload image
      const image_url = await imageUpload(pet_image)
      console.log(image_url)
      setPetData({ ...petData, pet_image: image_url })
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err.message)
    }
  }


  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    const updatedPetData = Object.assign({}, petData)
    delete updatedPetData._id
    console.log(updatedPetData)
    try {
      const { data } = await axiosSecure.put(
        `/campaign/update/${pet?._id}`,
        updatedPetData
      )
      console.log(data)
      refetch()
      setIsEditModalOpen(false)
      setLoading(false)
      toast.success('Campaign info updated')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err.message)
    }
  }

  

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Update Pet Info
                </DialogTitle>
                <div className='mt-2 w-full'>
                  {/* Update Campaign form */}
                  <UpdateCampaignForm
                    handleSubmit={handleSubmit}
                    petData={petData}
                    loading={loading}
                    handleImage={handleImage}
                    setPetData={setPetData}
                    imagePreview={imagePreview}
                    imageText={imageText}
                    refetch={refetch}
                  />
                </div>
                <hr className='mt-8 ' />
                <div className='mt-2 '>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-[#86ffd5] px-4 py-2 text-sm font-medium text-[#2a8666] hover:bg-[#50c99e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36b689] focus-visible:ring-offset-2'
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateCampaignModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default UpdateCampaignModal;