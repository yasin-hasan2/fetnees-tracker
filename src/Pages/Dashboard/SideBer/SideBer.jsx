import { NavLink } from "react-router-dom";
import { FaUserCircle, FaHouseUser, FaUsers, FaUserTie, FaCalendar, FaTimes} from "react-icons/fa";
import { MdLocalActivity, MdPostAdd } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import "./sideber.css";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import useAdmin from "../../../Hooks/useAdmin";
import useTrainer from "../../../Hooks/useTrainer";

const SideBer = () => {
  const [isAdmin]= useAdmin()
  const [isTrainer] = useTrainer()
  // console.log(isAdmin);
  // console.log(isTrainer);
  // const isTrainer = false;
  // const isAdmin = true;
  return (
    <div>
      <ul id="side" className="text-xl text-white font-medium space-y-5 p-5 md:h-full">
        

        {isTrainer && <>
            <li>
              <NavLink
                to="/dashboard/manage-slot"
                className={"flex items-center gap-2"}>
                <FaTimes/> Manage Slot
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-members"
                className={"flex items-center gap-2"}>
                <FaUsers/> Manage Members
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/dashboard/add-classes"
                className={"flex items-center gap-2"}>
                <SiGoogleclassroom/> Add New Class
              </NavLink>
            </li>
          </> }
        {  
        
          
          isAdmin && <>
          
          <li>
              <NavLink
                to="/dashboard/balance"
                className={"flex items-center gap-2"}>
                <FaMoneyCheckDollar /> Balance
              </NavLink>
            </li>
          <li>
              <NavLink
                to="/dashboard/all-subscriber"
                className={"flex items-center gap-2"}>
                <FaUsers /> All Subscriber
              </NavLink>
            </li>
          <li>
              <NavLink
                to="/dashboard/all-trainers"
                className={"flex items-center gap-2"}>
                <FaUserTie /> All Trainers
              </NavLink>
            </li>
          <li>
              <NavLink
                to="/dashboard/applied-trainers"
                className={"flex items-center gap-2"}>
                <BsFileEarmarkPost /> Applied Trainers
              </NavLink>
            </li>
          </> 

        }

        {
          !isAdmin && !isTrainer && <>
          {" "}
          <li>
            <NavLink
              to="/dashboard/activity-log"
              className={"flex items-center gap-2"}>
              <MdLocalActivity /> Activity Log
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/recommended-class"
              className={"flex items-center gap-2"}>
              <SiGoogleclassroom /> Recommended Classes{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/class-schedule"
              className={"flex items-center gap-2"}>
              <FaCalendar /> Classes Schedule{" "}
            </NavLink>
          </li>
        </> 
        }

        <hr />
        {
          isAdmin &&  <li>
          <NavLink
            to="/dashboard/add-forum"
            className={"flex items-center gap-2"}>
            <MdPostAdd/> Add New Forum
          </NavLink>
        </li> || isTrainer &&  <li>
              <NavLink
                to="/dashboard/add-forum"
                className={"flex items-center gap-2"}>
                <MdPostAdd/> Add New Forum
              </NavLink>
            </li>
        }
        <li>
          <NavLink to="/" className={"flex items-center gap-2"}>
            <FaHouseUser /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={"flex items-center gap-2"}>
            <FaUserCircle /> Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBer;
