/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Shared/Loader/Loader";
import useTrainer from "../Hooks/useTrainer";

const TrainerRouter = ({children}) => {
    const {user, loading}= useAuth()
    const [isTrainer , trainerLoader] = useTrainer()
    const location = useLocation()
    if(loading || trainerLoader){
        return <Loader/>
    }
    if(user && isTrainer){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
}
 
export default TrainerRouter;