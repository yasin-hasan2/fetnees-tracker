import { useQuery } from "@tanstack/react-query";
import SectionHelmet from "../../../Components/SectionHelmet";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterUsers, setFilterUser] = useState([])
  const { data: users = [] , refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  useEffect(()=>{
    const filterUser = users.filter(user=> user?.role === "member")
    setFilterUser(filterUser)
   
  },[users])
  // console.log(filterUser[0]);
  const handleSend = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure to send email ${user?.email}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const templateParams = {
            to_email: user?.email,
            subject: "Strong Community",
            message: "Congratulation you accepted a new member of strong community",
          };
          const res = await emailjs.send(
            "service_ngz2qsb",
            "template_tyql4km",
            templateParams,
            "JlpXCvdYgzXy6-d-i"
          );
          if (res.status === 200) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Email Send Suceess !",
              showConfirmButton: false,
              timer: 1000,
            });
            refetch();
          } else {
            console.error("Failed to send  email");
          }
        } catch (err) {
          console.log(" error-->", err);
        }
      }
    });
   
  };

  return (
    <div>
      <SectionHelmet title={"Strong | dashboard-manage Members"} />
      <SectionTitle title={"Manage All Members"} />

      <div className="overflow-x-auto mx-10 shadow-lg border">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-xl">Name</th>
              <th className="text-xl">Email</th>
              <th className="text-xl">Role</th>
              <th className="text-xl">Send Email</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user, index) => (
              <tr key={user._id}>
                <th className="text-xl">{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button onClick={()=>handleSend(user)} className="btn btn-success text-xl text-white">Send</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
