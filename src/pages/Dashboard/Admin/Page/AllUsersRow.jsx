import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../../../components/Modal/UpdateUserModal'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { data } from 'autoprefixer'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth'



const AllUsersRow = ({ user, refetch, index }) => {
  // console.log(user)
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()
  const { user: loggedInUser } = useAuth()
  const {mutateAsync} = useMutation({
    mutationFn: async role => {
      const {data} = await axiosSecure.patch(
        `/users/update/${user?.email}`, /** Don't use user email because useAuth user provide us user email */
        role
      )
      return data
    },
    onSuccess: data => {
      refetch()
      console.log(data)
      toast.success('User role updated successfully!')
      setIsOpen(false)
    },
    
  })

  // modal handler
  const modalHandler = async selected => {

    // if (user?.status === 'Verified')
    //   return toast.success("User can't send request for change Role")

    if(loggedInUser.email === user.email){
      toast.error("Action Not Allowed")
      return setIsOpen(false)
    }

    console.log('user Role Updated', selected)
    const userRole = {
      role: selected,
      status: 'Verified',
      // email: user?.email,
    }

    try {
      await mutateAsync(userRole)
      console.log(data)
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <img className='w-12 h-12' src={user?.image} alt="" />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <p className='text-gray-900 whitespace-no-wrap'>
     
        <div>
          {user?.role === 'Admin' ? <span className='bg-green-500 text-white font-bold px-5 py-2 rounded-lg'>{user?.role} </span> : <span className=' font-bold px-6 py-2 '>{user?.role}</span>}
        </div>
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-rose-400 hover:bg-green-500 rounded-md'
          ></span>
          <span className='relative text-white px-1'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          modalHandler={modalHandler} 
          user={user} 
        />
      </td>
    </tr>
  )
}

AllUsersRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default AllUsersRow;