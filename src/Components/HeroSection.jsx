import { useNavigate } from "react-router-dom";
import heroImage from "./src/assets/hero-Section.jpeg";


const HeroSection = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/quiz');
    };
  return (
    <div className="bg-[#A1D6E2] flex flex-col md:flex-row items-center justify-center p-8 md:p-16 min-h-[90vh]">
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center ">
        <img
          src={heroImage}
          className="rounded-3xl shadow-2xl w-full  border-4 border-[#1995AD]"
          alt="hero"
        />
      </div>
      <div className="md:w-1/2 flex flex-col items-center  md:pl-16">
        <h1 className="text-6xl font-bold mb-6 text-center  text-[#0D0D0D]">
          Take a Quiz
        </h1>
        <p className="text-2xl mb-8 leading-relaxed text-center  text-[#0D0D0D]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Quis molestiae voluptates sed natus dolores iusto reiciendis laboriosam voluptatem est dolor?
        </p>
        <button onClick={handleClick} className="bg-[#1995AD] hover:cursor-pointer  hover:bg-[#5cd1ff] transition-all text-white text-center w-full font-semibold py-3 px-8 rounded-2xl shadow-md">
          Start
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
