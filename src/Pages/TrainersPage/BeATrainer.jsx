import { useForm } from "react-hook-form";
import SectionHelmet from "../../Components/SectionHelmet";
import SectionTitle from "../../Components/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxioPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const BeATrainer = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const formRef = useRef(null)
    const [checkboxValues, setCheckboxValues] = useState([]);
    const handleChecket = (e)=>{
        const {value, checked} = e.target

        if(checked === true){
            setCheckboxValues(value)
        }
    }
    // console.log(checkboxValues);
  const onSubmit = async (data) => {
    // console.log(data);
    //   console.log(postData);
    // console.log();
    // img host in imgbb
    const fileImg = { image: data?.image[0] };
    const res = await axiosPublic.post(
      "https://api.imgbb.com/1/upload?key=1e3d9b9de0fac648ff4fe1ebb1bc6ff4",
      fileImg,
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
      console.log(res.data.data);
    const avilabledTime = data?.available_time_day;
    if(avilabledTime > 6){
        return toast.error('Your daily  Hours are heigh !')
    }
    if(avilabledTime <= 0){
       return toast.error('Invalide daily hour number')
    }

    const postInfo = {
      name: user?.displayName,
      email: user?.email,
      age: data?.age,
      image: res.data.data?.display_url,
      skills: checkboxValues,
      available_time_week: data?.available_time_week,
      available_time_day: data?.available_time_day,
      join_date: new Date(),
      year_experience: data?.Experince
    };
    // console.log(po);
    try {
      const post = await axiosSecure.post("/trainers", postInfo);
      if(post.data.acknowledged){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Post Success !",
          showConfirmButton: false,
          timer: 1000
        });
        formRef.current.reset()
      }
    } catch (err) {
      console.log("post error", err);
    }
  };
  return (
    <div className="mt-24 px-5">
      <SectionHelmet title={"Strong | Be A Trainer"} />
      <SectionTitle title={"Be a trainer"} />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
        <div className="grid  md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              required
              {...register("name")}
              defaultValue={user?.displayName}
              className="input input-bordered input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              required
              name="email"
              {...register("email")}
              defaultValue={user?.email}
              readOnly
              className="input input-bordered input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label ">
              <span className="label-text ">Profile Image</span>
            </label>
            <input
              type="file"
              name="image"
              required
              {...register("image")}
              className="file-input file-input-bordered file-input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              required
              name="age"
              {...register("age")}
              placeholder="Your Age"
              className="input input-bordered input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Time in a week</span>
            </label>
            <input
              type="number"
              {...register("available_time_week")}
              name="available_time_week"
              placeholder="Available Time In Week"
              className="input input-bordered input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available Time in a day</span>
            </label>
            <input
              type="number"
              required
              {...register("available_time_day")}
              placeholder="1-6 hours daily time"
              className="input input-bordered input-error w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Year Of Experince</span>
            </label>
            <input
              type="number"
              required
              {...register("Experince")}
              placeholder="Your Experince years"
              className="input input-bordered input-error w-full "
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 mt-5 justify-center">
          <h2 className="text-xl font-semibold">Skills: </h2>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Yoga Trainer</span>
              <input
                type="checkbox"
                onChange={ handleChecket}
                className="checkbox checkbox-error"
                value={"Yoga Trainer"}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Gym Trainer</span>
              <input
                type="checkbox"
                onChange={ handleChecket}
                value={"Gym Trainer"}
                className="checkbox checkbox-error"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Morning Yoga</span>
              <input
                type="checkbox"
                onChange={ handleChecket}
                value={"Morning Yoga"}
                className="checkbox checkbox-error"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Personal Trainer</span>
              <input
                type="checkbox"
                onChange={ handleChecket}
                value={"Personnal Trainer"}
                className="checkbox checkbox-error"
              />
            </label>
          </div>
          
        </div>
        <button
          type="submit"
          className="btn btn-error text-xl text-white w-full mt-5">
          Applied
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
