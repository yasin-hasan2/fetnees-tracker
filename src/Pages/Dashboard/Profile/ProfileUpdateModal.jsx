/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

const ProfileUpdateModal = ({ setRefetch }) => {
  const { user, profileUpdate } = useAuth();
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
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
    // console.log(res?.data?.data?.display_url);
    if (res.data?.success) {
      profileUpdate(user?.displayName, res?.data?.data?.display_url)
        .then(() => {
          toast.success("Profile Update Success");
        //   refetch();
        //   console.log(refetch);
        setRefetch(new Date().getTime())
          const modal = document.getElementById("my_modal_3");
          modal.close();
        })
        .catch((err) => {
          console.log("Profile Update error ---> ", err);
        });
    }
  };
  return (
    <div>
      <button
        className="btn btn-circle text-xl"
        onClick={() => document.getElementById("my_modal_3").showModal()}>
        <FaCamera />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Chose Image</span>
              </label>
              <input
                {...register("image")}
                required
                type="file"
                className="file-input file-input-bordered "
              />
            </div>
            <button type="submit" className="btn btn-success text-xl text-white mt-10">Update</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileUpdateModal;
