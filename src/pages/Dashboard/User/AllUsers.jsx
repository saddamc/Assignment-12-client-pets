import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
// import AllUsersRow from "../Admin/Page/AllUsersRow";
import avatarImg from '../../../assets/images/placeholder.jpg'
import useAuth from "../../../hooks/useAuth";
import AllUsersRow from "../Admin/Page/AllUsersRow";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
        const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(users)

    return (
        <>
        <Helmet> 
        <title>All Users | Dashboard</title>
      </Helmet>
        
        <div>
             <div className="flex gap-12  mb-8 items-center  py-4 font-bold">
                <div className="flex  w-4/12 gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><FaUsers /> </p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Users  </h2>
                        <p className="text-2xl"> {users.length} </p>
                    </div>
                </div>
                {/* <div className="flex w-4/12 gap-12">
                </div>
                <div className=" w-4/12 text-center ">
                </div> */}
            </div>
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
                      #
                    </th>

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
                      Email
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Profile Picture
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      role
                    </th>
                  </tr>
                </thead>
                  <tbody>
                  {
                        users.map((user, index) => 
                             <AllUsersRow key={user._id} user={user} index={index}
                            //   handleDelete={handleDelete}
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