import { useQuery } from "@tanstack/react-query";
import Cover from "../../Components/Cover";
import SectionHelmet from "../../Components/SectionHelmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import img from '../../assets/images/trainer.jpg'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle";
import { FaArrowRight } from "react-icons/fa";

const TrainersPage = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { data: trainers = [] } = useQuery({
        queryKey: "trainer",
        queryFn: async () => {
          const res = await axiosSecure.get("/trainers");
          return res.data;
        },
      });
    return ( 
        <div>
            <SectionHelmet title={"Strong | Trainers"} />
            <Cover img={img} title={'All Trainers'} />
            <div className="max-w-6xl mx-auto mt-10 ml-5">
                <button  onClick={()=> navigate('/be-a-trainer')} className="text-xl btn btn-success text-white">Become a trainer <FaArrowRight/></button>
            </div>
            <SectionTitle title={"All Trainers"}/>
            <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
                {
                    trainers.map(trainer => <div key={trainer?._id} className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                      <img src={trainer?.image} alt="profile-picture" />
                    </div>
                    <div className=" space-y-3 text-center">
                      <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {trainer?.name}
                      </h4>
                      <div className="flex justify-center items-center gap-3 ">
                <button className="btn btn-circle btn-sm text-xl text-blue-600"><FaFacebook/></button>
                <button className="btn btn-circle btn-sm text-xl text-blue-400">< FaTwitter/></button>
                <button className="btn btn-circle btn-sm text-xl text-slate-600"><FaInstagram/></button>
              </div>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                        Experience: {trainer?.year_experience} Years
                      </p>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                        Available Time Slot: {trainer?.available_time_day} hours
                      </p>
                    </div>

                    <div className="flex justify-center py-3">
                        <button onClick={()=> navigate(`/trainerDetails/${trainer?._id}`)} className="btn btn-success text-xl text-white " >Know More</button>
                    </div>
                   
                  </div>)
                }
            </div>
        </div>
     );
}
 
export default TrainersPage;