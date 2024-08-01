import SectionTitle from "../../../Components/SectionTitle";
import bgImg from "../../../assets/images/testomonial.jpg";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import { useQuery } from "@tanstack/react-query";
// import { Rating } from "@smastrom/react-rating";
// import ReactStarsRating from 'react-awesome-stars-rating';

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [] } = useQuery({
    queryKey: "reviews",
    queryFn: async () => {
      const res = await axiosPublic.get("/testomonial");
      return res.data;
    },
  });
  // console.log(reviews);
  return (
    <div>
      <SectionTitle
        title={"Testimonial"}
        description={"What say our clients ?"}
      />
      <div
        className="hero py-20  bg-fixed overflow-x-hidden"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-[380px] md:max-w-2xl  lg:max-w-5xl mx-auto">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper">
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <div className="space-y-5">
                    <div className="flex items-center justify-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <img src={review?.author_pic} />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{review?.author_name}</h2>
                         {/* <Rating className="w-10" value={review?.rating}  /> */}
                         {/* <ReactStarsRating value={review?.rating} />; */}
                      </div>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-semibold text-[#fe1313]">{review?.title}</h3>
                        <p className="text-xl text-gray-300 mt-5">{review?.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
