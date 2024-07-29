import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePayment = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    // Fetch Payment Data
    const {data: payments = [], isLoading, refetch} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
          const res = await axiosSecure.get(`/payments/${user.email}`)
          return res.data;
        }
    
      })


    return [payments, refetch, isLoading]
};

export default usePayment;