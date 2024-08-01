import { useState } from "react";
import SectionHelmet from "../../../Components/SectionHelmet";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import bgImg from "../../../assets/images/slider1.jpg";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";
const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [filterUsers, setFilterUser] = useState([]);
  const [refetch, setRefetch] = useState()
  const { data: ProfileUser = [] } = useQuery({
    queryKey: ["ProfileUser", refetch],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  useEffect(() => {
    const filterUser = ProfileUser.filter(
      (users) => users?.email === user?.email
    );
    setFilterUser(filterUser);
  }, [ProfileUser, user?.email]);

  return (
    <div>
      <SectionHelmet title={"Strong | Dashboard-Profile"} />
      <div className="md:w-[500px] mx-auto mt-5 shadow-lg border   p-3">
        <div className=" relative">
          <img src={bgImg} className="w-full h-[200px]" alt="" />
          <div className="avatar online absolute right-[35%] -bottom-10">
            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
            <div className="absolute bottom-0 right-0 ">
              <ProfileUpdateModal setRefetch={setRefetch} />
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mt-10">
          {user?.displayName}
        </h2>
        <div className="space-y-3 mt-6">
          <p className="text-xl text-gray-500 font-medium">
            Email: {user?.email}
          </p>
          <p className="text-xl text-gray-500 font-medium">
            Your Role: {filterUsers[0]?.role}
          </p>
          <p className="text-xl text-gray-500 font-medium">
            Profile id: {filterUsers[0]?._id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
