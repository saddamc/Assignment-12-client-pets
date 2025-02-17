import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { ImSpinner9 } from "react-icons/im"
import { PiUserCirclePlusFill } from "react-icons/pi"
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { imageUpload } from '../../Api/ImageUpload'
import useAuth from '../../hooks/useAuth'



const SignUp = () => {
  const navigate = useNavigate()
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const {createUser, signInWithGoogle, updateUserProfile, loginGithub, loading,
    setLoading, saveUser } = useAuth()
    

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]
    console.log(name, email, password)
    console.log(image)
      


    try{
      setLoading(true)
      // 1. Upload image and get image url
      const image_url = await imageUpload(image)
      // console.log(image_url)
      
      // 2. user Registration
      const result = await createUser( email, password)
      console.log(result)
      
      //  3. Save username and photo in mongoDB
      await updateUserProfile(name, image_url)
      await saveUser({displayName: name, email: email, photoURL:image_url})
      navigate('/')
      toast.success('Signup Successful')

    

    } catch(err){
      console.log(err)
      toast.error(err.message)
    }
  

  setRegisterError('');
  setSuccess('');

  // password conditions
  if (password.length < 6) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Password must be at least 6 characters !</a>'
      });
      return;
  }
  else if (!/[A-Z]/.test(password)) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Missing Uppercase Letter !</a>'
      }); ('Must have an ');
      return;
  }
  else if (!/[a-z]/.test(password)) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Missing Lowercase Letter !</a>'
      });
      return;
  }
  else if (!/[0-9]/.test(password)) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Missing Numeric key !</a>'
      });
      return;
  }

}


  // Google SignIn
  const handleGoogleLogin = async () => {
    console.log(handleGithubLogin)
    try{
      setLoading(true)
      await signInWithGoogle()
  
      navigate('/')
      toast.success('SignIn Successful')

    } catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  // Google SignIn
  const handleGithubLogin = async () => {
    try{
      setLoading(true)
      await loginGithub()
  
      navigate('/')
      toast.success('SignIn Successful')

    } catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }



  return (

    <div className='flex justify-center items-center min-h-screen bg-[#BFDADA] '>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 
       bg-[#113B54] text-[#C4AC8C] '>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl text-white font-bold items-center text-center flex justify-center uppercase'> <span className='text-5xl mr-2'><PiUserCirclePlusFill /></span> Sign Up</h1>
          <p className='text-sm animate-bounce text-rose-600 font-bold'>Welcome to Petco</p>
        </div>
        
        <form
         onSubmit={handleSubmit}
          className='space-y-6 '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                NAME
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                SELECT IMAGE:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                EMAIL ADDRESS
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  PASSWORD
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
      {/* Register Button */}

            <button
            disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 font-extrabold shadow-slate-100 shadow-md  hover:bg-black text-white'
            >
              {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Sign Up'}
              {/* {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Register'} */}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-white '></div>
          <p className='px-3 text-sm  dark:text-[#C4AC8C]'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-white'></div>
        </div>
        <div className="  min-w-[255px] min-h-[45px] items-center rounded-md mx-auto mb-10 space-y-2 justify-center text-center">

    <div className="flex gap-4 justify-center my-4 ">
      <div className="text-xl rounded-md shadow-md shadow-slate-100">
        <button 
        disabled={loading}
        onClick={handleGoogleLogin} 
        className="disabled:cursor-not-allowed bg-yellow-700 w-[120px] h-[40px] px-2 py-1 font-semibold text-white rounded-md flex justify-center text-center items-center hover:bg-green-500 hover:text-black">
            <FcGoogle></FcGoogle>
            <span className="ml-1">Google</span></button>
      </div>
      <div className="text-xl rounded-md shadow-md shadow-slate-100">
        <button 
        disabled={loading}
        onClick={handleGithubLogin} 
        className="disabled:cursor-not-allowed bg-slate-600 w-[120px] h-[40px] px-2 font-semibold text-white rounded-md flex justify-center text-center items-center hover:bg-green-500 hover:text-black">
            <FaGithub></FaGithub>
            <span className="ml-1">GitHub</span></button>
      </div>
    
    </div>
      <p className='px-6 text-sm text-center text-[#C4AC8C] '>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline text-[#31aaf0] hover:text-rose-500 font-bold'
          >
            Sign In
          </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default SignUp;
