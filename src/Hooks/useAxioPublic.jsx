import axios from "axios";

const useAxios = axios.create({
    baseURL: 'http://localhost:5600'
})

const useAxiosPublic = () => {
    return useAxios;
}
 
export default useAxiosPublic;