/* eslint-disable react/prop-types */

const Cover = ({img, title}) => {
    return ( 
        <div
        className="hero h-[40vh] md:h-[70vh] relative"
        style={{ backgroundImage: `url(${img})` }}> 
        <div className="hero-content bg-red-500 absolute bottom-0 rounded-t-3xl">
          <h2 className="text-3xl md:text-6xl text-center font-bold text-white">
            {title}
          </h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.3)]"></div>
      </div>
     );
}
 
export default Cover;