import { useNavigate } from "react-router-dom";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RecommendedClass = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { data: classes = [] } = useQuery({
      queryKey: "classes",
      queryFn: async () => {
        const res = await axiosSecure.get("/classes");
        return res.data;
      },
    });
    return ( 
        <div>
            <SectionHelmet title={'Strong | Dashboard-Recommended Class'} />
            <SectionTitle title={'Your Recommended Class'} description={'Chose Your best class for best fitness.'} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
        {
            classes.map(classe => <div className="w-full relative" key={classe?._id}>
                    <img src={classe?.image} className="h-300px w-full" alt="" />
                    <div className="bg-[rgba(0,0,0,0.6)] absolute bottom-0 w-full flex items-center justify-between px-5 py-3">
                        <h2 className="text-xl text-white">{classe?.class_name}</h2>
                        <button onClick={()=> navigate(`/classes-details/${classe?._id}`)} className="bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]">Details</button>
                    </div>
            </div>)
        }
      </div>
        </div>
     );
}
 
export default RecommendedClass;