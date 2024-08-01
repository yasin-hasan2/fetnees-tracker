/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import logo from "../../../assets/icons/letter.png";
import toast from "react-hot-toast";
const NewsLetter = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    // console.log(name, email);
    const letter = { name, email };

    try {
      const res = await axiosPublic.post("/newsLetters", letter);
      if (res.data?.acknowledged) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Subscribe Success !",
          showConfirmButton: false,
          timer: 1000,
        });
        form.reset();
      }
    } catch (err) {
      toast.error(err.message)
    }
  };
  return (
    <div className="flex justify-center my-10 px-5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <img src={logo} className="w-16" alt="" />
          <div>
            <h2 className="text-4xl font-semibold text-center">
              Subscribe to our newsletter
            </h2>
            <p className="font-medium text-gray-600 text-center">
              We'll keep you updated with the best new jobs.
            </p>
          </div>
        </div>
        <form  onSubmit={handleSubmit}>
          <div className="md:join">
            <input
              type="text"
              name="name"
              defaultValue={user && user?.displayName}
              required
              className="input input-bordered md:join-item w-full"
              placeholder="Name"
            />
            <br />
            <input
              type="email"
              name="email"
              defaultValue={user && user?.email}
              required
              className="input input-bordered md:join-item w-full my-3"
              placeholder="Email"
            /> <br />
            <div className="flex justify-center">
            <button
              disabled={!user}
              type="submit"
              className="btn hidden md:flex  rounded-r-full bg-[#fe1313] text-xl text-white hover:bg-[#9d3434]">
              Subscribe
            </button>
            <button disabled={!user} type="submit" className="btn bg-[#fe1313] text-xl text-white md:hidden">Subscribe</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
