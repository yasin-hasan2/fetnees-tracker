import { Calendar } from "react-date-range";
import SectionHelmet from "../../../Components/SectionHelmet";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ActivityLog = () => {

    const axiosSecure = useAxiosSecure()
    const [currentTime, setCurrentTime] = useState(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    const navigate = useNavigate()
    const {data: activitySlot = []} = useQuery({
        queryKey: ['activitySlot'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/trainers')
            return res.data;
        }
    })
    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);
    return ( 
        <div>
            <SectionHelmet title={"Strong | Dashboard-Activity Log"}/>
            <section className="mx-5">
            <section className="grid  md:grid-cols-2  gap-5 border p-3 rounded-md shadow-md ">
            <div className="order-2">
            <Calendar date={new Date()} />
          </div>
          <div className="mt-14 order-1 space-y-2 relative">
            <h3 className=" font-medium text-slate-600">{currentTime}</h3>
            <h2 className="text-3xl font-bold text-slate-700">Total Trainer Slot: {activitySlot?.length}</h2>
            <div className="md:absolute bottom-5">
                <button onClick={()=> navigate('/trainers')} className="btn text-white bg-[#B9005B] text-xl"> <FaArrowLeft/> Trainer Page</button>
            </div>
          </div>
            </section>

          <div className="grid md:grid-cols-2 gap-5 mt-6">
            {
                activitySlot.map(slot => <div style={{boxShadow: '1px 5px 10px gray'}} className="p-5 border rounded space-y-2" key={slot._id}>
                <h2 className="text-2xl font-semibold text-slate-700">Trainer Name: {slot?.name}</h2>
                <h2 className="text-xl font-semibold text-slate-600">Trainer skills: {slot?.skills}</h2>
                <h2 className="text-gray-500 font-medium">Available Time Slot: {slot?.available_time_day} hours</h2>
                <h2 className="text-gray-500 font-medium">Trainer Experience: {slot?.year_experience} Years</h2>
                
            </div>)
            }
          </div>
          
            </section>
        </div>
     );
}
 
export default ActivityLog;