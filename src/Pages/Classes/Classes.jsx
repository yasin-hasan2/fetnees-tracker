import { useQuery } from "@tanstack/react-query";
import SectionHelmet from "../../Components/SectionHelmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle";
import Cover from "../../Components/Cover";
import img from "../../assets/images/slider2.jpg";
import { useNavigate } from "react-router-dom";
import Schedule from "../../Components/Schedule";

const Classes = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const { data: classes = [] } = useQuery({
    queryKey: "classes",
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  // console.log(classes);
  return (
    <div>
      <SectionHelmet title={"Strong | Classes"} />
      <Cover img={img} title={"Our Classes"} />
      <Schedule/>
      <SectionTitle
        title={"Our Classes"}
        description={"Chose Your Best class."}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
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
};

export default Classes;
