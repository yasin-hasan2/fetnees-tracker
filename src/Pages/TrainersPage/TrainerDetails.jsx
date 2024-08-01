import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SectionHelmet from '../../Components/SectionHelmet';
import SectionTitle from '../../Components/SectionTitle';

const TrainerDetails = () => {
  const trainer = useLoaderData();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const generateTimeSlots = (numSlots) => {
    const timeSlots = [];
    for (let i = 1; i <= numSlots; i++) {
      const formattedTime = `${i}:00 ${i < 12 ? 'AM' : 'PM'}`;
      timeSlots.push(formattedTime);
    }
    return timeSlots;
  };
  
  const handleButtonClick = (slot) => {
    setSelectedSlot(slot);
    navigate('/trainer-booked',{state: {trainer, slot}})
  };

  return (
    <div className="mt-24">
      <SectionHelmet title={'Strong | Trainer Details'} />
      <SectionTitle title={'Trainer Details'} />
      <div className="flex flex-col md:flex-row  justify-center items-center gap-5 max-w-6xl mx-auto mt-10">
        <div className="mx-5 md:w-[400px] p-4 border-l-red-500 border-b-red-500 border-l-2 border-b-2">
          <img src={trainer?.image} className="" alt="" />
        </div>
        <div className="space-y-5 text-center md:text-start">
          <div className="flex justify-center md:justify-start items-center gap-4">
            <div className="border border-[#fe1313] w-[60px]"></div>
            <p className="text-xl font-medium text-[#fe1313] uppercase">
              Trainer Details
            </p>
          </div>
          <h2 className="text-4xl font-bold">{trainer?.name}</h2>
          <p className="text-gray-500 cursive-font">Skill: {trainer?.skills}</p>
          <p className="text-gray-500 cursive-font">
            Experience: {trainer?.year_experience} Years
          </p>
          <p className="text-gray-500 cursive-font">
            Available Time Slot: {trainer?.available_time_day} hours
          </p>
          {/* Displaying time slots as buttons */}
          <div className="flex justify-center flex-wrap">
            {generateTimeSlots(trainer?.available_time_day).map((slot, index) => (
              <button
                key={index}
                className={`bg-gray-200 px-4 py-2 m-2 rounded-md hover:bg-gray-300 ${selectedSlot === slot ? 'border-[#fe1313] border-2' : ''}`}
                onClick={() => handleButtonClick(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <div className="flex justify-center md:justify-start items-center gap-5">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
