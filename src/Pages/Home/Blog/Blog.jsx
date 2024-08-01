import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import blogImg from "../../../assets/images/blog.jpg";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: blogs = [] } = useQuery({
    queryKey: "blog",
    queryFn: async () => {
      const res = await axiosPublic.get("/community");
      return res.data;
    },
  });
  return (
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        title={"Blog"}
        description={"Highlights of recent blogs."}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center ">
          <img src={blogImg} className="w-full md:w-[500px] md:rounded h-full" alt="" />
        </div>
        <div className="">
          <div className="  grid md:grid-cols-2 gap-3 px-5">
            {blogs.slice(0, 6).map((blog) => (
              <div
                key={blog._id}
                className="card w-full border hover:border-[#fe1313]">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-4">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={blog?.profile_image} />
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">{blog?.name}</h2>
                        <h2 className="text-[#fe1313]">{blog?.date}</h2>
                      </div>
                    </div>
                  </div>

                  <p>{blog?.description.slice(0, 40)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => navigate("/community")}
              className="bg-[#fe1313] px-6 py-2 rounded-md font-medium text-white p-2 text-xl hover:bg-[#c20505]">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
