import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SectionHelmet from "../Components/SectionHelmet";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxioPublic";
import regisANimatio from '../assets/animation/registration.json'
import Lottie from "lottie-react";

const Registration = () => {
  const { profileUpdate, createUser } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await createUser(data?.email, data?.password);
      // console.log(res);
      if (res) {
        await profileUpdate(data?.name, data?.photo);
        const userInfo = {
          name: data?.name,
          email: res?.user?.email,
          role: "member"
        }
        await axiosPublic.post('/users', userInfo)
        toast.success('Registration Success !')
        navigate('/')
      }
    } catch (err) {
      toast.error(err.message)
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <SectionHelmet title={"Strong | Registration"} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="md:w-[600px]">
          <Lottie animationData={regisANimatio} loop={true} />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                required
                placeholder="Enter Your Name"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Enter Your Email"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                {...register("photo")}
                required
                placeholder="Enter Your Photo URL"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                required
                placeholder="Password"
                className="input input-bordered input-error w-full max-w-xs"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505] border-none">
                Registration
              </button>
            </div>
            <p className="text-center">
              Already have an account ?{" "}
              <Link className="text-[#fe1313] font-medium" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
