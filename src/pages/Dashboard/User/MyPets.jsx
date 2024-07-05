import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import MyPetsRow from './Page/MyPetsRow'

const MyPets = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    // Fetch Pets Data
  const {data: pets = [], isLoading, refetch} = useQuery({
    queryKey: ['pets' ],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/my-pets/${user?.email}`)
      return data
    }
  })
  console.log(pets)

    
    // delete database
    const {mutateAsync} = useMutation({
        mutationFn: async id => {
            const {data} = await axiosSecure.delete(`/pet/${id}`)
            return data;
        },
        onSuccess: data => {
          console.log(data)
          refetch()
          toast.success(`Pets deleted Successfully`)
        },
    })

    // Handle Delete button
        const handleDelete = async id => {
        console.log(id)
        try{
            await mutateAsync(id)
        } catch(err) {
            console.log(err)
        }
    }

      
    
      if (isLoading) return <LoadingSpinner />
    

  return (
    <>
      <Helmet> 
        <title>My Pets | Dashboard</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                        Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Age
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Pet row data */}
                {
                  pets.map(pet => (
                      <MyPetsRow key={pet._id} pet={pet} handleDelete={handleDelete} refetch={refetch} />
                    ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPets;