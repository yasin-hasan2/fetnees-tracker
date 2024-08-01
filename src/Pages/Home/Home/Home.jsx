import SectionHelmet from "../../../Components/SectionHelmet";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Blog from "../Blog/Blog";
import Featured from "../Featured/Featured";
import NewsLetter from "../NewsLetter/NewsLetter";
import Trainer from "../Trainer/Traienr";
import Testimonial from "../testimonial/Testimonial";

const Home = () => {
    return ( 
        <div>
            <SectionHelmet title={'Strong | Home'}/>
            <Banner/>
            <Featured/>
            <About/>
            <Testimonial/>
            <Blog/>
            <Trainer/>
            <NewsLetter/>
        </div>
     );
}
 
export default Home;