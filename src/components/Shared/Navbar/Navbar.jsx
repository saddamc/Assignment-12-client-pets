import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { Link } from 'react-router-dom'
import avatarImg from '../../../assets/images/placeholder.jpg'
import useAuth from '../../../hooks/useAuth'
import useDonate from '../../../hooks/useDonate'
import Container from '../Container'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [donate, refetch, isLoading] = useDonate()
  const [isOpen, setIsOpen] = useState(false)


  
  return (
    <div className=' fixed w-full bg-white px-4 z-50  shadow-lg'>
      <div className='py-4 border-b-[1px] '>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                className='hidden md:block'
                src='https://i.ibb.co/0q1jV6N/logo.png'
                alt='logo'
                width='105'
                height='40'
              />
            </Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3 md:gap-10'>
              
                <div className='flex'>
                  {
                    user ? (
                      <Link
                        to='/donation'
                        className='px-4 py-2.5 rounded-lg bg-green-500 text-white hover:bg-yellow-500 transition font-semibold'
                      >
                        <button className='flex'>
                          Donate 
                          {
                            donate.length ?
                            <Link to="/dashboard/my-donations">
                            <div className='bg-red-400 text-white ml-2 px-1.5 py-0.5 rounded-xl'>+{donate.length} </div>
                            </Link>
                            :
                            null
                          }
                        </button>
                      </Link>
                    ) : null
                  }
                          
                </div>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-1 md: md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-green-400 hover:shadow-md transition'
                  >
                  <AiOutlineMenu />
                  <div className=''>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
                
              </div>
              
              {isOpen && (
                <div className='absolute rounded-xl  shadow-md w-[40vw] md:w-[10vw] bg-slate-600 text-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-red-500 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                      <Link
                      to='/dashboard'
                      className='block px-4 py-3 hover:bg-red-500 transition font-semibold ' 
                    >
                      Dashboard
                    </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-red-500 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-red-500 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-red-500 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                      
                    )}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar;
