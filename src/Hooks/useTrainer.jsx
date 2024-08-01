import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useTrainer = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isTrainer, isLoading:trainerLoader} = useQuery({
        queryKey: ['trainer'],
        enabled: !loading && !!localStorage.getItem("access-token"),
        queryFn: async()=>{
           const res = await axiosSecure.get(`/users/${user?.email}`)
           return res.data?.trainer;
        }
    })
    console.log(isTrainer, 'trainer');
    return [isTrainer, trainerLoader]
}
 
export default useTrainer;