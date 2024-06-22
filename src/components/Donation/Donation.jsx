import { Helmet } from "react-helmet-async";
import { MdCampaign } from "react-icons/md";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import DonationRow from "./DonationRow";


const Donation = () => {
    const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  console.log(category)

  // Fetch Pets Data
  const {data: pets = [], isLoading, refetch} = useQuery({
    queryKey: ['pets' ],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/all-campaign`)
      return data
    }
  })
  console.log(pets)

    
  
    if (isLoading) return <LoadingSpinner />

    return (
        <>
        <Helmet> 
          <title>Donate | Campaign</title>
        </Helmet>
          
        <div>
          <div className="flex items-center justify-center font-bold mt-6">
                  <div className="flex  w-[350px] justify-center items-center gap-24 bg-slate-500 shadow-md p-4 rounded-lg  ">
                      <div className="w-3/12 text-white ">
                          <p className="px-4 py-3 bg-rose-500 rounded-lg shadow-lg font-bold text-xl"><MdCampaign /> </p>
                      </div>
                      <div className="w-full text-center">
                          <h2 className="text-lg opacity-80 text-white uppercase">Total Campaign</h2>
                          {/* <p className="text-2xl"> {pets.length} </p> */}
                      </div>
                  </div>
               
          </div>
            <p className="text-center mt-6 font-bold text-xl w-[350px] rounded-lg bg-rose-100 mx-auto py-1">Select Campaign for Donate</p>
  
  
          <div className='container mx-auto px-2 sm:px-2'>
          <div className='py-2'>
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
                        Pet Name
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
                        Last Date
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                          Maximum Donation
                      </th>

                      <th
                        scope='col'
                        className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                      >
                          Donation Progress
                      </th>
                      
                      
                      <th
                        scope='col'
                        className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold'
                      >
                        Donate
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>{/* Pet row data */}
                  {
                    pets.map((pet, index) => (
                        <DonationRow key={pet._id} pet={pet} index={index} refetch={refetch} />
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

export default Donation;