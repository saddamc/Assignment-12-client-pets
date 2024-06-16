import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import MyPetsRow from './Page/MyPetsRow'
import toast from 'react-hot-toast'

const MyPets = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    // Fetch Pets Data
    const {data: pets = [], isLoading, refetch} = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
          const {data} = await axiosSecure.get(`/my-pets/${user?.email}`) 
          return data
        }
      })
    //   console.log(pets)

    
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

    // handle Update Button 

    
    
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
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                        Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Age
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Room row data */}
                    {
                        pets.map(pet => 
                             <MyPetsRow key={pet._id} pet={pet}
                              handleDelete={handleDelete}
                              refetch={refetch}
                             > </MyPetsRow>
                              )
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