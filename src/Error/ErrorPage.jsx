import Lottie from 'lottie-react';
import error from '../assets/animation/error.json'
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import SectionHelmet from '../Components/SectionHelmet';

const ErrorPage = () => {
    const navigate = useNavigate()
    return ( 
        <div className='md:w-[400px] mx-auto'>
            <SectionHelmet title={'Error'}/>
            <Lottie animationData={error} loop={true}/>
            <h2 className="text-3xl font-semibold text-center text-red-500 mb-5">This Page Not Available !</h2>
            <div className='flex justify-center'>
                <button onClick={()=> navigate('/')} className="btn bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]"><TiArrowBack/> Back to Home</button>
            </div>
        </div>
     );
}
 
export default ErrorPage;