import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const {user, loading} = useAuth()
    // console.log(user);
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin,isFetching:adminLoading} = useQuery({
        queryKey:[ 'admin'],
        enabled: !loading && !!localStorage.getItem("access-token"),
        queryFn: async()=>{
           const res = await axiosSecure.get(`/users/${user?.email}`)
           return res.data?.admin;
        }
    })
    console.log(isAdmin, 'admin');
    return [isAdmin, adminLoading]
}
 
export default useAdmin;