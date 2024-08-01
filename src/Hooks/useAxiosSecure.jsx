import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxios = axios.create({
  baseURL: "http://localhost:5600",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

useEffect(()=>{
  useAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      console.log("request stop", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
},[])

  useAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
    //   console.log(status);

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return useAxios;
};

export default useAxiosSecure;
