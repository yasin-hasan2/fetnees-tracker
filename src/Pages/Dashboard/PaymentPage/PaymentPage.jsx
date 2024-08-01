import { useLoaderData, useNavigate } from "react-router-dom";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import { TiArrowBack } from "react-icons/ti";
import Payment from "./Payment";

const PaymentPage = () => {
    const trainer = useLoaderData()
    const navigate = useNavigate()
    return ( 
        <div>
            <SectionHelmet title={"Strong | Trainer Salary"} />
            <SectionTitle title={'Payment Trainer Monthly Salary'} />
            <div className="max-w-3xl mx-auto p-5 shadow-md border rounded-md">
            <div className="text-xl font-semibold text-gray-600  space-y-2 flex justify-between">
                <div>
                <h2 >Name: {trainer?.name}</h2>
                <h4>{trainer?.category}</h4>
                <h3>BDT: 20,000 </h3>
                </div>
                <button onClick={()=> navigate(-1)} className="btn bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]"><TiArrowBack/> Go Back</button>
            </div>
            <div className="mt-10">
               <Payment trainer={trainer}/>
            </div>
            </div>
        </div>
     );
}
 
export default PaymentPage;