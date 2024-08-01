/* eslint-disable react/prop-types */
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const AppliedModal = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleAccept = async (id) => {
    const res = await axiosSecure.patch(`/users/${id}`, { role: "trainer" });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Accept Success !",
        text: "You have been successfully accept this member to trainer.",
        icon: "success",
      });
      refetch();
      const modal = document.getElementById("my_modal_3");
      modal.close();
    }
  };

  const handleReject = async () => {
    try {
      const templateParams = {
        to_email: user?.email,
        subject: "Application Rejectoin",
        message: "Unfortunately, your application has been rejected.",
      };
      const res = await emailjs.send(
        "service_ngz2qsb",
        "template_tyql4km",
        templateParams,
        "JlpXCvdYgzXy6-d-i"
      );
      if (res.status === 200) {
        console.log("Rejection email sent successfully!");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Rejection Email Send Success !",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
        const modal = document.getElementById("my_modal_3");
        modal.close();
      } else {
        console.error("Failed to send rejection email");
      }
    } catch (err) {
      console.log("Rejectoin error-->", err);
    }
  };

  return (
    <div>
      <button
        className="btn text-xl"
        onClick={() => document.getElementById("my_modal_3").showModal()}>
        <MdOutlineSystemUpdateAlt />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="space-y-3 text-start">
            <h1 className="text-2xl font-bold mb-5">
              Applied Member Information: 👇
            </h1>
            <h2 className="text-xl font-semibold text-gray-500">
              Name: {user?.name}
            </h2>
            <h2 className="text-xl font-semibold text-gray-500">
              Email: {user?.email}
            </h2>
            <h2 className="text-xl font-semibold text-gray-500">
              Role: {user?.role}
            </h2>
            <h2 className="text-xl font-semibold text-gray-500">
              User Id: {user?._id}
            </h2>
            <div className="flex items-center gap-6 mt-5">
              <button
                onClick={() => handleAccept(user?._id)}
                className="btn text-xl text-white btn-success">
                Confirm
              </button>
              <button
                onClick={() => handleReject(user?._id)}
                className="btn btn-error text-xl text-white">
                Reject
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedModal;
