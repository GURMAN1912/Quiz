import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/results');
    };
  return (
    <div className="bg-[#F1F1F2] md:text-4xl text-2xl  font-bold p-6 text-center shadow-xl border-b-2 border-[#1995AD]">
      <div className='flex justify-between justify-items-center'>
      <Link to="/" className="hover:cursor-pointer">🚀 Interactive Quiz App
      </Link>
      <div className=' '>
        <button onClick={handleClick} className='bg-[#1995AD] hover:cursor-pointer md:text-2xl text-lg hover:bg-[#5cd1ff] transition-all text-white text-center w-full font-semibold py-2 px-6 rounded-2xl shadow-md'>
            view results
        </button>
      </div>
      </div>
    </div>
  );
};

export default Header;
