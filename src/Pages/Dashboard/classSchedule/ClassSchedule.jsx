import Schedule from "../../../Components/Schedule";
import SectionHelmet from "../../../Components/SectionHelmet";

const ClassSchedule = () => {
    return ( 
        <div>
            <SectionHelmet title={'Strong | Dashboard-Class-Schedule'} />
            <div>
                <Schedule/>
            </div>
        </div>
     );
}
 
export default ClassSchedule;