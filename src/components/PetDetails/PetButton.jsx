import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import toast from 'react-hot-toast'

const PetButton = ({ pet }) => {
  const axiosCommon = useAxiosCommon()
  // const {id} = useParams()
  const {user} = useAuth()

    // Fetch Adopt Data
    const {data: adopt = {}, isLoading, refetch} = useQuery({
        queryKey: ['adopt', ],
        queryFn: async () => {
          const {data} = await axiosCommon.get(`/adopt/${id}`) 
          return data
        }
      })
      console.log(adopt)

      const {mutateAsync} = useMutation({
        mutationFn: async adoptData => {
          const {data} = await axiosCommon.post('/adopt', adoptData)
          return data;
        },
        onSuccess: () =>{
          console.log('Data Saved Successfully')
          // toast.success('Pet Added Successfully')
          // navigate('/dashboard/my-pets')
          // setLoading(false)
        }
      })

        // Adopt handle
  const handleAdoption = async e => {
    // e.preventDefault()
    // setLoading(true)
    const status = 'adopt'
    const Adopt = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const adoptData = {
        pet,
        status,
        Adopt,
      }
      console.table(adoptData)

      // Post request to server
      await mutateAsync(adoptData)

    } catch (err) {
      console.log(err)
      toast.error(err.message)
      // setLoading(false)
    }
  
  }



      if (isLoading) return <LoadingSpinner />




  return (
    
      
      <div className='p-4'>
        

          <button onClick={handleAdoption}>
            <Button label={'Adoption'} />
          </button>
        
        
      </div>
    
  )
}

PetButton.propTypes = {
  room: PropTypes.object,
}

export default PetButton;
