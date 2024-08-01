import { useQuery } from "@tanstack/react-query";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AllSubscriber = () => {
  const axiosPublic = useAxiosPublic();
  const { data: subscribers = [], refetch } = useQuery({
    queryKey: ["subscriber"],
    queryFn: async () => {
      const res = await axiosPublic.get("/newsLetters");
      return res.data;
    },
  });
  // console.log(subscribers);
  const handleDelete =  (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are You sure to delete this subscriber ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "red",
      confirmButtonText: "Yes !",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/newsLetters/${id}`);
        if (res.data.deletedCount > 0) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
        }
        refetch();
      }
    });
   
  };
  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-All Subscriber"} />
      <SectionTitle title={"All Subscriber"} />
      <div>
        <div className="overflow-x-auto max-w-2xl mx-auto p-5 shadow-xl border rounded-md">
          <h2 className="text-xl mb-5 font-bold">
            Total Subscriber: {subscribers?.length}
          </h2>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-xl"></th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Email</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {subscribers?.map((subscriber, index) => (
                <tr key={subscriber._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>{subscriber?.name}</td>
                  <td>{subscriber?.email}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="text-red-500 btn btn-circle btn-sm text-xl">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSubscriber;
