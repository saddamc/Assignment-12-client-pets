import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
  const DeleteDonation = ({ closeModal, isOpen, handleDelete, id }) => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle
                    as='h3'
                    className='text-lg font-medium justify-center text-center leading-6 text-gray-900'
                  >
                    Are you sure! Want to Remove? Click Delete.
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm justify-center text-center text-gray-500'>
                      You cannot undo once it&apos;s done!
                    </p>
                  </div>
                  <hr className='mt-8 ' />
                  <div className='flex mt-4  justify-evenly'>
                    <button
                    onClick={() => {
                      handleDelete(id)
                      closeModal()
                    }}
                      type='button'
                      className='inline-flex justify-center rounded-md  border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
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
  
  DeleteDonation.propTypes = {
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
  }
  
  export default DeleteDonation;