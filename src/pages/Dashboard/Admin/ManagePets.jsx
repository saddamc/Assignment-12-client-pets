import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import ManagePetsRow from "./Page/ManagePetsRow";
import { useSearchParams } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md";

const ManagePets = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  console.log(category)

  // Fetch Pets Data
  const {data: pets = [], isLoading, refetch} = useQuery({
    queryKey: ['pets' ],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/all-pets`)
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
        <title>Pets Manage | Dashboard</title>
      </Helmet>
        
      <div>
        <div className="flex items-center justify-center font-bold">
                <div className="flex  w-[300px] justify-center items-center   gap-24 bg-blue-200 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-yellow-500 rounded-lg shadow-lg font-bold text-xl"><MdOutlinePets /> </p>
                    </div>
                    <div className="w-full text-center">
                        <h2 className="text-lg opacity-50 uppercase">Total Pets</h2>
                        <p className="text-2xl"> {pets.length} </p>
                    </div>
                </div>
             
        </div>


        <div className='container mx-auto px-2 sm:px-2'>
        <div className='py-4'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                  <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Adopt
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                        Name & Email <span className="lowercase">(Adopter)</span>
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
                  pets.map((pet, index) => (
                      <ManagePetsRow key={pet._id} pet={pet} index={index} handleDelete={handleDelete} refetch={refetch} />
                    ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
        </>
    );
};

export default ManagePets;