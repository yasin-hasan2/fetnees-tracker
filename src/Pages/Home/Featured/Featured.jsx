
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxioPublic";
import { useQuery } from "@tanstack/react-query";
import FeaturedCards from "./FetauredCards";

const Featured = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured");
      return res.data;
    },
  });
  // console.log(featured);
  return (
    <div>
      <SectionTitle
        title={"Featured"}
        description={"This is Our Featured Section."}
      />
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-5">
        {
            featured.map(card => <FeaturedCards key={card?._id} card={card}/>)
        }
      </div>
    </div>
  );
};

export default Featured;
