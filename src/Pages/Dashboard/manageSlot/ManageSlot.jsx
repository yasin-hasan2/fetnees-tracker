import { useQuery } from "@tanstack/react-query";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ManageSlot = () => {
    const axiosSecure  = useAxiosSecure()
    const {data: manageSlot = [], refetch} = useQuery({
        queryKey: ['manageSlot'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/bookeds')
            return res.data
        }
    })
    const handleRejct = (user) => {
        Swal.fire({
          title: "Are you sure to reject ?",
          text: `Are you sure to send email ${user?.your_email}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(async(result) => {
          if (result.isConfirmed) {
            try {
              const templateParams = {
                to_email: user?.your_email,
                subject: "Strong Community",
                message: `Sorry your ${user?.your_slot} slot has rejected in a trainer, try to next time !`,
              };
              const res = await emailjs.send(
                "service_ngz2qsb",
                "template_tyql4km",
                templateParams,
                "JlpXCvdYgzXy6-d-i"
              );
              if (res.status === 200) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: " Reject Email Send Suceess !",
                  showConfirmButton: false,
                  timer: 1000,
                });
                refetch();
              } else {
                console.error("Failed to send  email");
              }
            } catch (err) {
              console.log(" error-->", err);
            }
          }
        });
       
      };
    return ( 
        <div>
            <SectionHelmet title={'Strong | Dashboard-Manage Slot'} />
            <SectionTitle title={"Manage Slot"} description={'Manage a all booked slot'} />
            <div className="grid md:grid-cols-2 gap-5 mx-5">
                {
                    manageSlot.map(slot => <div style={{boxShadow: '1px 5px 10px gray'}} className="p-5 border rounded space-y-2" key={slot._id}>
                        <h2 className="text-2xl font-semibold text-slate-700">Name: {slot?.your_name}</h2>
                        <h2 className="text-xl font-semibold text-slate-600">Trainer Name: {slot?.trainer_name}</h2>
                        <h2 className="text-gray-500 font-medium">Eamil: {slot?.your_email}</h2>
                        <h2 className="text-gray-500 font-medium">Booked Slot: {slot?.your_slot}</h2>
                        <h2 className="text-green-600 font-semibold">Price: {slot?.price} $</h2>
                        <h2 className="text-slate-700 font-semibold">Package: {slot?.ranks}</h2>
                        <button onClick={()=> handleRejct(slot)} className="btn btn-error text-white text-xl" >Reject</button>
                    </div>)
                }
            </div>
        </div>
     );
}
 
export default ManageSlot;