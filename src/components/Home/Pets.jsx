import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import { useSearchParams } from 'react-router-dom'

const Pets = () => {
  const axiosCommon = useAxiosCommon()
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  console.log(category)

  const {data: pets = [], isLoading} = useQuery({
    queryKey: ['pets', category],
    queryFn: async () => {
      const {data} = await axiosCommon.get(`/pets?category=${category}`)
      return data
    }
  })
  console.log(pets)


  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
  
      {pets && pets.length > 0 ? (
        <div className='pt-12 max-w-7xl justify-center items-center mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {pets.map(pet => (
            <Card key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Pets Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  )
}

export default Pets;
