/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Shared/Loader/Loader";
import useAdmin from "../Hooks/useAdmin";

const AdminRouter = ({children}) => {
    const {user, loading}= useAuth()
    const [isAdmin , adminLoading] = useAdmin()
    const location = useLocation()
    if(loading || adminLoading){
        return <Loader/>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
}
 
export default AdminRouter;