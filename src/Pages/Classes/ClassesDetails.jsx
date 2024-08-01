import { useLoaderData, useNavigate } from "react-router-dom";
import SectionHelmet from "../../Components/SectionHelmet";

const ClassesDetails = () => {
    const classe = useLoaderData()
    const navigate = useNavigate()
    const {image, class_name, description} = classe;
    return ( 
        <div>
            <SectionHelmet title={'Strong | Classes Details'}/>
            <div className='flex flex-col md:flex-row items-center gap-5 max-w-6xl mx-auto pt-20'>
            <div className='flex-1 mx-5 p-4 border-l-red-500 border-b-red-500 border-l-2 border-b-2'>
                <img src={image} className='w-full' alt="" />
            </div>
            <div className='flex-1 text-center md:text-start space-y-5 px-5'>
            <div className="flex justify-center md:justify-start items-center gap-4">
            <div className="border border-[#fe1313] w-[60px]"></div>
            <p className="text-xl font-medium text-[#fe1313] uppercase">View All Details</p>
          </div>
          <h2 className='text-4xl font-bold'>{class_name}</h2>
          <p className='text-gray-500'>{description}</p>
         
          <div className="flex justify-center md:justify-start items-center gap-5">
          <button onClick={()=> navigate(-1)} className="bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]">
            Go Back
          </button>
          <button onClick={()=> navigate('/trainers')} className="bg-[#1e8332] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#05c21b]">
            Join Now
          </button>
          </div>
            </div>
        </div>
        </div>
     );
}
 
export default ClassesDetails;