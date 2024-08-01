/* eslint-disable react/prop-types */
const SectionTitle = ({title, description}) => {
    return ( 
        <div className="w-1/2 mx-auto text-center my-10">
            <h2 className="text-3xl font-bold border-b-2 border-[#fe1313] w-fit mx-auto">{title}</h2>
            <p className="text-gray-500 text-xl font-medium">{description}</p>
        </div>
     );
}
 
export default SectionTitle;