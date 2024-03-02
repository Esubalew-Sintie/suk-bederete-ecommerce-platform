import React from "react";

const NavBar = ({ onButtonClick }) => {
  const handleClick = (view) => {
    onButtonClick(view);
  };
  return (
    <>
      <div className="flex items-center pl-4 mb-5 py-2 px-5">
        <button
          type="button"
          className="mx-4 "
          onClick={() => handleClick("desktop")}
        >
          <img
            src="computer.png"
            alt="desktop"
            width={50}
            height={20}
            className="   "
          />
        </button>
        <button className="mx-4 " onClick={() => handleClick("mobile")}>
          <img
            src="mobile-phone.png"
            alt="desktop"
            width={50}
            height={20}
            className="   "
          />
        </button>
        <button>
          <span>
            <i class="fa-solid fa-rotate-left"></i>
          </span>
        </button>
        <button>
          <span className="text-base z-10">
            <i class="fa-solid fa-rotate-right"></i>
          </span>
        </button>
        <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase rounded shadow hover:shadow-lg ml-auto py-2 px-2 ease-linear transition-all duration-150">
          Preview
        </button>
        <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase py-2 px-2 rounded shadow hover:shadow-lg ml-auto">
          Publish
        </button>
      </div>
    </>
  );
};

export default NavBar;
