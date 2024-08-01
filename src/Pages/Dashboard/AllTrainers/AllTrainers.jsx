import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });
  // console.log(trainers);
  const isPaymentEnabled = (joinDate) => {
    const currentDate = new Date();
    const joinDateObject = new Date(joinDate); 
    const differenceInDays = Math.floor((currentDate - joinDateObject) / (1000 * 60 * 60 * 24));
    return differenceInDays >= 30;
  };
  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-All Trainers"} />
      <SectionTitle title={"All Trainers"} />
      <div className="overflow-x-auto max-w-4xl mx-auto p-5 shadow-xl border rounded-md">
      
        <h2 className="text-xl font-bold btn mb-5">Total Trainers: {trainers?.length} <FaUserTie /> </h2>
        
       
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-xl">Profile</th>
              <th className="text-xl">Name</th>
              <th className="text-xl">Category</th>
              <th className="text-xl">Join Date</th>
              


              <th className="text-xl">Salary</th>
              
            </tr>
          </thead>
          <tbody>
            {trainers?.map((trainer, index) => (
              <tr key={trainer._id}>
                <td className="text-xl">{index + 1}</td>
                <td>
                 
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={trainer?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  
                  
                </td>
                <td>
                  {trainer?.name}
                 
                 
                </td>
                <td>{trainer?.category}</td>
                <td>{trainer?.join_date}</td>
                <th>
                <button onClick={()=> navigate(`/dashboard/payment-page/${trainer?._id}`)} className={`btn ${isPaymentEnabled(trainer?.join_date) ? 'btn-success' : 'btn-disabled'} text-white text-xl`} disabled={!isPaymentEnabled(trainer?.join_date)}>Pay</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainers;
