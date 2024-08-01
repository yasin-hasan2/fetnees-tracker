/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionHelmet from "../Components/SectionHelmet";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxioPublic";
import loginAnimation from '../assets/animation/login (2).json'
import Lottie from "lottie-react";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation()
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await signIn(data?.email, data?.password);
      toast.success("Login Success !");
      navigate(location?.state ? location?.state : '/')
    } catch (err) {
      toast.error(err.message);
    }
  };

  // google login
  const handleGoogleLogin = async () => {
    try {
      const resgoogle = await googleLogin();
      // console.log(resgoogle);
      if (resgoogle) {
        const userInfo = {
          name: resgoogle?.user?.displayName,
          email: resgoogle?.user?.email,
          role: "member",
        };
        await axiosPublic.post("/users", userInfo);
        toast.success("Google Login Success !");
        navigate(location?.state ? location?.state : '/')
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <SectionHelmet title={"Strong | Login"} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="md:w-[600px]">
          <Lottie animationData={loginAnimation} loop={true}/>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
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
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have any account ?{" "}
              <Link className="text-[#fe1313] font-medium" to="/registration">
                Registration
              </Link>
            </p>
          </form>
          <div className="px-7 p-5">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full text-xl border-[#fe1313]">
              <FaGoogle /> Continue With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
