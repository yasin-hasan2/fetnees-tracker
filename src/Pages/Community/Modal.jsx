/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { MdOutlinePostAdd } from "react-icons/md";
import useAxiosPublic from "../../Hooks/useAxioPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useRef } from "react";

const Modal = ({refetch}) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef(0)

  const onSubmit = async (data) => {
    // console.log(data);
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

    const users = await axiosSecure.get('/users')
    // console.log(users.data);
    const filerData =   users.data.filter(roleUser => roleUser?.email === user?.email)

    

    const postInfo = {
      name: user?.displayName,
      profile_image: user?.photoURL,
      description: data?.description,
      image: res?.data?.data?.display_url || "",
      date: new Date(),
      role:filerData[0]?.role,
    };
    try {
      const post = await axiosSecure.post("/community", postInfo);
      if(post.data.acknowledged){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Post Success !",
          showConfirmButton: false,
          timer: 1000
        });
        refetch()
        modalRef.current.reset()
        const modal = document.getElementById("my_modal_1")
        modal.close()
      }
    } catch (err) {
      console.log("post error", err);
    }
  };
  return (
    <div >
      <button
        className="btn lowercase text-xl"
        onClick={() => document.getElementById("my_modal_1").showModal()}>
        <MdOutlinePostAdd /> Post
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form ref={modalRef}  onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Article</span>
              </label>
              <textarea
                {...register("description")}
                required
                className="textarea textarea-error"
                placeholder="Your article.."></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                {...register("image")}
                required
                type="file"
                className="file-input file-input-bordered  w-full h-[100px]"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505] border-none">
                Post
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
