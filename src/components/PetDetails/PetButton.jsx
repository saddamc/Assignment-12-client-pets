import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const PetButton = () => {
  const axiosSecure = useAxiosSecure()
  const {id} = useParams()
  const {user} = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

    // Fetch Adopt Data
    const {data: adopt = {}, isLoading, refetch} = useQuery({
        queryKey: ['adopt', id],
        queryFn: async () => {
          const {data} = await axiosSecure.get(`/adopt/${id}`) 
          return data
        }
      })
      console.log(adopt)

      const {mutateAsync} = useMutation({
        mutationFn: async adoptData => {
          const {data} = await axiosSecure.patch(`/adopt/${id}`, adoptData)
          return data;
        },
        onSuccess: () =>{
          // console.log('Data Saved Successfully')
          toast.success('Adopt Successfully')
          navigate('/dashboard/my-adopt')
          setLoading(false)
          refetch()
        }
      })

        // Adopt handle
  const handleAdoption = async e => {
    setLoading(true)
    const status = 'adopt'
    const adopter = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const adoptData = {
        status,
        adopter,
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
