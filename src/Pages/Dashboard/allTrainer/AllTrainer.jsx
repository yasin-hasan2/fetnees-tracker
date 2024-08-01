import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import { FaPaypal } from "react-icons/fa";
import Swal from "sweetalert2";
import { GiConfirmed } from "react-icons/gi";

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate()
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  // console.log('data-->', payments);
  const handlePaymentSucess = async(id)=>{
        const res = await axiosSecure.patch(`payments/${id}`, {status: 'success'})
        // console.log(res.data);
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: 'Accept Payment success !',
                showConfirmButton: false,
                timer: 1000,
              });
              refetch()
        }
  }
  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-All Trainers Payment Status"} />
      <SectionTitle title={"All Trainer Payment Status"} />
      <div className="overflow-x-auto mx-10 p-5 shadow-xl border rounded-md">
        <h2 className="text-xl font-bold btn mb-5">
          Total payments: {payments?.length} <FaPaypal />{" "}
        </h2>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-xl">Name</th>
              <th className="text-xl">Category</th>
              <th className="text-xl">Date</th>
              <th className="text-xl">TransactionId</th>
              <th className="text-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((trainer, index) => (
              <tr key={trainer._id}>
                <td className="text-xl">{index + 1}</td>
                <td>{trainer?.name}</td>
                <td>{trainer?.category}</td>
                <td>{trainer?.date}</td>
                <td>{trainer?.transactionId}</td>
                <td>
                    {
                        trainer?.status === 'pending' ? <button onClick={()=> handlePaymentSucess(trainer?._id)} className="btn text-xl"><span className="loading loading-spinner text-error"></span>Pending</button>
                        :
                        <button className="btn btn-success text-xl cursor-text text-white"><GiConfirmed/> Paid</button>
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainer;
