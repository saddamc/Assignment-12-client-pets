import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router-dom'
import errorImage from "../assets/images/error.jpg";

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container items-center min-h-screen mx-auto'>
        <div className='flex flex-col items-center max-w-6xl mx-auto text-center'>
            <div>
              <img src={errorImage} alt="" />

            </div>
   

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
           
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center px-5 py-1 text-sm text-gray-900 transition-colors font-bold duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180 text-cyan-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              Go back
            </button>

            <Button label={'Take Me Home'} onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
