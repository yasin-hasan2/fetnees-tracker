import { useQuery } from "@tanstack/react-query";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AppliedModal from "./AppliedModal";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: applied = [] , refetch } = useQuery({
    queryKey: ["applied"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const members = applied.filter((member) => member?.role === "member");
  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-Applied Trainer"} />
      <SectionTitle title={"Applied Trainer."} />
      {
        members?.length === 0 ? <p className="text-red-500 text-3xl font-semibold text-center">No Trainer Applied !</p> : <div className="overflow-x-auto mx-10 shadow-lg border">
        <table className="table table-zebra">

          <thead>
            <tr>
              <th></th>
              <th className="text-xl">Name</th>
              <th className="text-xl">Email</th>
              <th className="text-xl">Role</th>
              <th className="text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((user, index) => (
              <tr key={user._id}>
                <th className="text-xl">{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button> <AppliedModal user={user} refetch={refetch} /> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default AppliedTrainer;
