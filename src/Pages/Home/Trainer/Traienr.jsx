import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import SectionTitle from "../../../Components/SectionTitle";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Trainer = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers = [] } = useQuery({
    queryKey: "team",
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });
  return (
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        title={"Trainers"}
        description={"Our Professional Trainers."}
      />
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-3 px-5">
        {trainers.slice(0,3).map((trainer) => (
          <div
            key={trainer?._id}
            className="group relative cursor-pointer items-center justify-center overflow-hidden ">
            <div className="">
              <img
                className="h-full w-full object-cover rounded-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={trainer?.image}
                alt=""
              />
            </div>
            <div className="absolute rounded-md inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute rounded-md inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="text-3xl font-bold text-white">{trainer?.name}</h1>
              <p className="text-xl text-[#fe1313] mb-3">{trainer?.category}</p>
              <div className="flex items-center gap-3">
                <button className="btn btn-circle btn-sm text-xl text-blue-600"><FaFacebook/></button>
                <button className="btn btn-circle btn-sm text-xl text-blue-400">< FaTwitter/></button>
                <button className="btn btn-circle btn-sm text-xl text-slate-600"><FaInstagram/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
