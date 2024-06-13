import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../../../hooks/useAuth'
import { MdOutlineCampaign} from 'react-icons/md'
import { RiStickyNoteAddFill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { SiEclipseadoptium } from "react-icons/si";
import { BiSolidDonateHeart } from "react-icons/bi";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import UserModal from '../../Modal/UserModal'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useRole from '../../../hooks/useRole'
import MenuItem from './Menu/MenuItem'
import { FaUserCog } from 'react-icons/fa'
import UserMenu from './Menu/UserMenu'
import AdminMenu from './Menu/AdminMenu'


const Sidebar = () => {
  const axiosSecure = useAxiosSecure()
  const { logOut, user } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()
  console.log(role, isLoading)
  const isAdmin =  true;

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  // for Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Modal Handler 
  const modalHandler = async () => {
    console.log('I want to be a host')
    closeModal()
    try {
      const currentUser = {
        email: user?.email,
        role: 'Admin',
        status: 'Requested',
        
      }
      console.log(currentUser)
  
      const { data } = await axiosSecure.put(`/user`, currentUser)
      console.log(data)
      if(data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation')
      } else {
        toast.success('Please!, wait for admin approval')
      }
    } catch (err) { 
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
  }

  return (
    <>
     {/* Small Screen Navbar */}
     <div className=' text-gray-800 flex justify-end pt-[90px] md:hidden '>
        <div>
          
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col   justify-between overflow-x-hidden mt-[68px] bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          
          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/*Admin Apply Button */}

              {
                role === 'User' &&
                <button
              // disabled={!user}
              onClick={() => setIsModalOpen(true)}              
                className=' bg-rose-500 ml-9 rounded-xl mt-4 opacity-70 hover:bg-green-500'
              >

                <span className='mx-4 font-medium text-slate-100 p-2'>Apply Admin</span>
              </button>
              
              }

              {/* Modal */}
              <UserModal isOpen={isModalOpen} closeModal={closeModal}
              modalHandler={modalHandler}
              />

               {/* Overview */}
               <MenuItem label='Overview' address='/dashboard' icon={BsGraphUp} />

               {role === 'User' &&  <UserMenu /> }
               {role === 'Admin' &&  <AdminMenu /> }


</nav>

</div>
      </div>
        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem label='Profile' address='/dashboard/profile' icon={FcSettings} />  
         
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
