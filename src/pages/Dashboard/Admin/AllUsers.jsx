import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import AllUsersRow from "./Page/AllUsersRow";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
        const {data} = await axiosSecure('/users');
            return data;
        }
    })
    console.log(users)

    return (
        <>
      <Helmet> 
        <title>User Manage | Dashboard</title>
      </Helmet>
        
        <div>
             <div className="flex items-center justify-center font-bold">
                <div className="flex  w-[300px] justify-center items-center   gap-24 bg-rose-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><FaUsers /> </p>
                    </div>
                    <div className="w-full text-center">
                        <h2 className="text-lg opacity-50 uppercase">Total User</h2>
                        <p className="text-2xl"> {users.length} </p>
                    </div>
                </div>
             
            </div>
            <div className='container mx-auto px-2 sm:px-2'>
        <div className='py-4'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto '>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden  border'>
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
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Name
                    </th>
                    
                   
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Email
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Profile Picture
                    </th>
                   
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      role
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-gray-300 border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                  <tbody>
                  {
                        users.map((user, index) => 
                             <AllUsersRow key={user._id} user={user} index={index} refetch={refetch}
                             > </AllUsersRow>
                              )
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

export default AllUsers;