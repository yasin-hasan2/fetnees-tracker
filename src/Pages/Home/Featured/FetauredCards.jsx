/* eslint-disable react/prop-types */

const FeaturedCards = ({card}) => {
    const {icon, title, description} = card;
    return ( 
        <div className="card border border-[#fe1313] p-5">
        <figure><img src={icon} className="w-20" /></figure>
        <div className="card-body">
          <h2 className=" text-center text-2xl font-bold">{title}</h2>
          <p className="text-center text-gray-500 cursive-font">{description}</p>
        </div>
      </div>
    
     );
}
 
export default FeaturedCards;