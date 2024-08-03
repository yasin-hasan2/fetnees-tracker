import axios from "axios";

const useAxios = axios.create({
    baseURL: 'https://fitness-tracker-server-tau.vercel.app'
})

const useAxiosPublic = () => {
    return useAxios;
}
 
export default useAxiosPublic;