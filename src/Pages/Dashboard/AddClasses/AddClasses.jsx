import { useForm } from "react-hook-form";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useRef } from "react";

const AddClasses = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const formRef = useRef(null)

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
    const postInfo = {
      trainer_name: user?.displayName,
      trainer_skill: data?.trainer_skill,
      description: data?.description,
      image: res?.data?.data?.display_url || "",
      class_name: data?.class_name,
    };
    try {
      const post = await axiosSecure.post("/classes", postInfo);
      if (post.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added Success !",
          showConfirmButton: false,
          timer: 1000,
        });
        formRef.current.reset()
      }
    } catch (err) {
      console.log("post error", err);
    }
  };

  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-Add Class"} />
      <SectionTitle title={"Added a new class"} />

      <div className="max-w-2xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
        <div className="flex items-center gap-4">
        <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Class</span>
            </label>
            <input
            {...register("class_name")}
              type="text"
              placeholder="Class Name"
              className="input input-bordered input-error w-full"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Skill</span>
            </label>
            <input
            {...register("trainer_skill")}
              type="text"
              placeholder="Trainer skill"
              className="input input-bordered input-error w-full"
              required
            />
          </div>
        </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description")}
              required
              className="textarea textarea-error"
              placeholder="Description
              "></textarea>
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
    </div>
  );
};

export default AddClasses;
