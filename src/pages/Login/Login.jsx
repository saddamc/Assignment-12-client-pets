import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { ImSpinner9 } from 'react-icons/im'
import useAuth from '../../hooks/useAuth'
import { FaGithub } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { signInWithGoogle, signIn, loginGithub, loading, setLoading } = useAuth()
  const location = useLocation()
  const from = location?.state || '/'


  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value
    const password = form.password.value;
    console.log(email, password);

    try{ 
      setLoading(true)
      // 1. Sign in user
      await signIn(email, password)
      navigate(from)
      toast.success('SignIn Successful')
    } catch(err){
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  // Google SignIn
  const handleGoogleLogin = async () => {
    try{
      setLoading(true)
      await signInWithGoogle()
  
      navigate(from)
      toast.success('SignIn Successful')

    } catch(err){
      console.log(err)
      toast.error(err.message)
      setLoading(false)
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
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#92B7B7] text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm animate-bounce text-rose-600 font-bold'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
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
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 font-extrabold shadow-slate-100 shadow-md  hover:bg-black text-white'
            >
              {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Sign In'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-rose-500 text-gray-600'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-800'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
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
        <p className='px-6 text-sm text-center text-gray-900'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-blue-700'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
