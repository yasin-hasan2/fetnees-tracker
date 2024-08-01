/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Shared/Loader/Loader";

const PrivateRoute = ({children}) => {
    const {user, loading}= useAuth()
    const location = useLocation()
    if(loading){
        return <Loader/>
    }
    if(user){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
}
 
export default PrivateRoute;