/* eslint-disable react/no-unknown-property */
import { useLocation, useNavigate } from "react-router-dom";
import SectionHelmet from "../../Components/SectionHelmet";
import SectionTitle from "../../Components/SectionTitle";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TrainerBooked = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { trainer, slot } = location.state || {};
  const [planDate, setPlanDate] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [planAvailability, setPlanAvailability] = useState([]);
  // console.log(trainer, slot);
  useEffect(() => {
    fetch("/trainerBooked.json")
      .then((res) => res.json())
      .then((data) => {
        setPlanDate(data)
        setPlanAvailability(data.map(()=> true))
      
      });
  }, []);

  const handleJoin = async (plan, index) => {
    const postInfo = {
      trainer_name: trainer?.name,
      trainer_email: trainer?.email,
      your_slot: slot,
      your_name: user?.displayName,
      your_email: user?.email,
      price: plan?.price,
      ranks: plan?.ranks,
      trainer: plan?.trainer,
    };

    try {
      const res = await axiosSecure.post("/bookeds", postInfo);
    //   console.log(res.data);
    if(res.data.acknowledged){
      setPlanAvailability((prevAvailability) => [
        ...prevAvailability.slice(0, index),
        false,
        ...prevAvailability.slice(index + 1),
      ]);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Join This plan Success !",
            showConfirmButton: false,
            timer: 1000
          });
         
    }
    } catch (err) {
      console.log("booked post err --->", err);
    }
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto">
      <SectionHelmet title={"Strong | Traiener Booked"} />
      <SectionTitle title={"Join Any Plan"} />
      <div className="space-y-2 mb-10 shadow-md rounded-md border p-5">
        <h2 className="text-2xl font-bold text-slate-700">
          Trainer Name: {trainer?.name}
        </h2>
        <h2 className="text-2xl font-bold text-slate-700">
          Trainer Skill: {trainer?.skills}
        </h2>
        <h2 className="font-semibold text-gray-500">
          Your select Slot: {slot}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-error text-xl text-white">
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="grid md:grid-cols-2 px-5 lg:grid-cols-3 gap-5  ">
        {planDate.map((plan,index) => (
           <div
           key={plan.id}
           className={`relative flex w-full flex-col rounded-xl ${
             planAvailability[index]
               ? "bg-gradient-to-tr from-pink-600 to-pink-400"
               : "bg-gray-300"
           } bg-clip-border p-8 text-white shadow-md shadow-pink-500/40`}
         >
            <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                {plan?.ranks}
              </p>
              <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-5xl">
                {plan?.price} / Mon $
              </h1>
            </div>
            <div className="p-0">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <span className="p-1 border rounded-full border-white/20 bg-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-3 h-3">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                  </span>
                  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                    {plan?.trainer} Trainers
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="p-1 border rounded-full border-white/20 bg-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-3 h-3">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                  </span>
                  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                    Supports: {plan?.support}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="p-1 border rounded-full border-white/20 bg-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-3 h-3">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>
                  </span>
                  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                    {plan?.special_support}
                  </p>
                </li>
              </ul>
            </div>
            <div className="p-0 mt-12">
            <button
                onClick={() => handleJoin(plan, index)}
                className={`block w-full select-none rounded-lg ${
                  planAvailability[index]
                    ? "bg-white text-pink-500"
                    : "bg-gray-500 text-gray-300 pointer-events-none"
                } py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button"
                data-ripple-dark="true"
                disabled={!planAvailability[index]}
              >
                {planAvailability[index] ? "Join Now" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerBooked;
