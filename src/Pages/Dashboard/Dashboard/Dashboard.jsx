import { Outlet } from "react-router-dom";
import SideBer from "../SideBer/SideBer";

const Dashboard = () => {
    return ( 
        <div className="w-full flex-col md:flex-row flex ">
            <div className="md:w-[25%] bg-[#B9005B] md:fixed md:h-full overflow-x-auto">
                <SideBer/>
            </div>
            <div className="md:w-[75%] md:ml-[25%]">
                <Outlet/>
            </div>
        </div>
     );
}
 
export default Dashboard;