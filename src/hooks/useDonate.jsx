import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonate = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    // Fetch Donation Data
  const {data: donate = [], isLoading, refetch} = useQuery({
    queryKey: ['donate', user?.email ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation/${user?.email}`)
      return res.data;
    }
  })


    return [donate, refetch, isLoading]
};

export default useDonate;