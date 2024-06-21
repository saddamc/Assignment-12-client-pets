import Container from '../../components/Shared/Container'
import { Helmet } from 'react-helmet-async'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import PetButton from '../../components/PetDetails/PetButton'



const PetDetails = () => {
  const {id} = useParams()
  const axiosCommon = useAxiosCommon()

  const {data: pet = {}, isLoading} = useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      const {data} = await axiosCommon.get(`/pet/${id}`)
      return data
    }
  })
  
  console.log(pet)
  
  if (isLoading) return <LoadingSpinner />
  


  return (
    <Container>
      <Helmet>
        <title> {pet?.pet_name} - Details </title>
      </Helmet>
   



      {pet && (
        <div className='max-w-screen-lg mx-auto lg:flex md:flex gap-4'>

          {/* part -1 */}
          <div className=' w-2/3'>
          {/* Header */}
          <div className='flex flex-col gap-6'>
            <div>
              <p className='text-4xl font-bold ml-24 my-4'> {pet?.pet_name} </p>
              <div className='w-[450px] md:w-[650px] lg:w-[650px] h-[500px]  overflow-y-auto rounded-xl'>
                <img
                  className='object-cover w-full'
                  src={pet.pet_image}
                  alt='header image'
                />
              </div>
            </div>
          </div>
          </div>
          <div className='grid grid-cols-1 md:gap-10 mt-6'>

            {/* 2nd part */}
           <div className='w-1/3 mt-12 '>
            {/* Pet Info */}
           <div className='space-y-2'>
              <div className='flex flex-col gap-2 w-full space-y-4'>
                <div
                  className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                >
                 
                  <div className='flex gap-2 items-center '> 
                    <FaUser className='w-[70px] h-[70px]'/>
                  <img
                    className='rounded-full  '
                    height='40'
                    width='40'
                    alt='Avatar'
                    src={pet?.User?.image}
                  />
                  
                  <p className=''> {pet?.User?.name}</p>
                  
                  </div>
                

                 
                </div>
                <div
                  className='
                flex 
                w-[300px]
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-800
              '
                >
                  <div>Age: {pet?.age} Years</div>
                </div>
              </div>

              <div className='flex w-[300px] text-neutral-500'>
                <p>Location: {pet.location} </p>
                 
              </div>
              <div className='flex w-[300px] text-neutral-500'>
                <p>Note: {pet.shortDescription} </p>
                 
              </div>
              <div className=' w-[300px] text-neutral-500'>
                <p className='underline text-black'>Details:  </p>
                <p>{pet.description}</p>
                 
              </div>
            </div>
           </div>

            <div className='md:col-span-3 order-first md:order-last mb-10'>
              {/* Adopt Button */}
              <PetButton pet={pet} />
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default PetDetails;
