import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import MyCampaignRow from './Page/MyCampaignRow'

const MyCampaigns = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    // Fetch Pets Data
    const {data: pets = [], isLoading, refetch} = useQuery({
        queryKey: ['pets'],
        queryFn: async () => {
          const {data} = await axiosSecure.get(`/my-campaign/${user?.email}`) 
          return data
        }
      })
      console.log(pets)

    
    // delete database
    const {mutateAsync} = useMutation({
        mutationFn: async id => {
            const {data} = await axiosSecure.delete(`/my-campaign/${id}`)
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
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-4 py-2 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 text-center bg-gray-300  border-b border-gray-200 text-gray-800  text-sm uppercase font-bold'
                    >
                      Name & Image
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Last Date
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Donated Amount
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Refund Donated
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
                <tbody>{/* Pet Campaign row data */}
                {
                  pets.map(pet => (
                      <MyCampaignRow key={pet._id} pet={pet} handleDelete={handleDelete} refetch={refetch} />
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

export default MyCampaigns;