import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { MdOutlineCampaign} from 'react-icons/md'
import { RiStickyNoteAddFill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { SiEclipseadoptium } from "react-icons/si";
import { BiSolidDonateHeart } from "react-icons/bi";
import { VscGitPullRequestCreate } from "react-icons/vsc";


const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
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
        className={`z-10 md:fixed flex flex-col   justify-between overflow-x-hidden mt-[82px] bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          
          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Overview */}
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Overview</span>
              </NavLink>

               {/* Add Pet */}
               <NavLink
                to='add-pet'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <RiStickyNoteAddFill className='w-5 h-5' />

                <span className='mx-4 font-medium'>Add Pet</span>
              </NavLink>

               {/* My Added Pets */}
               <NavLink
                to='my-pets'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <CiViewList className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Added Pets</span>
              </NavLink>
              
              
               

              {/* Adoption Request */}
              <NavLink
                to='adopt'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <SiEclipseadoptium className='w-5 h-5' />

                <span className='mx-4 font-medium'>Adopt Pets </span>
              </NavLink>

              {/* Create Donation Campaign */}
              <NavLink
                to='campaign'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <VscGitPullRequestCreate className='w-5 h-5' />

                <span className='mx-4 font-medium'>Create Campaign</span>
              </NavLink>


              {/* My Donation Campaigns */}
              <NavLink
                to='my-campaigns'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <MdOutlineCampaign className='w-8 h-8' />

                <span className='mx-4 font-medium'>My Campaigns</span>
              </NavLink>

              {/* My Donations */}
              <NavLink
                to='my-donations'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300   text-red-500' : 'text-gray-600'
                  }`
                }
              >
                <BiSolidDonateHeart className='w-6 h-6' />

                <span className='mx-4 font-medium'>My Donations</span>
              </NavLink>
              
              
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
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
