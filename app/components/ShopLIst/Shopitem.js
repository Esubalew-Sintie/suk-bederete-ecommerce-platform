"use client";
import React from "react";

const ShopItem = ({ fullWidth }) => {
  return (
    <div
      className={`group transition-transform duration-500  rounded-lg  hover:transform hover:scale-105 hover:rounded-xl hover:cursor-pointer hover:shadow-blue-200 transform  ${
        fullWidth ? "w-full" : "md:w-[45%] xl:w-[30%]"
      }  p-4 my-5  mx-5 overflow-hidden`}
    >
      <div className="relative   h-80 overflow-hidden">
        <img
          className="transition-all duration-1000 hover:scale-105 inset-0 h-full w-full object-cover"
          src="https://media.istockphoto.com/id/1206906927/photo/the-word-preview-on-a-blue-keyboard-button.jpg?b=1&s=612x612&w=0&k=20&c=d6ukqegO-dwN5FBgU8aDuhp54tYhmcoMCqVbUeKXRPY="
          alt=""
        />
      </div>
      <div className="p-4 bg-stone-100 py-5">
        <div className="flex items-center">
          <span
            className="transition-all duration-1000 inline-block px-4 py-3 leading-none bg-[#1E293B]   text-white rounded-xl font-bold uppercase tracking-wide text-xl group-hover:bg-slate-200 border group-hover:border-[#1E293B]  group-hover:text-[#1E293B] my-3"
            style={{ transitionDuration: "1s" }}
          >
            <p>Name of the Shop</p>
          </span>

          <button
            className="ml-auto text-white py-1 opacity-0 px-3 text-xl font-bold group-hover:opacity-100 bg-[#1E293B] rounded-lg transition-all"
            style={{ transitionDuration: "2s" }}
          >
            Visit
          </button>
        </div>
        <p className="my-4 font-bold md:text-xl sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur
        </p>
        <p className="md:text-xl sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </p>
      </div>
      <div className="transition-all duration-500 hover:border-stone-500 hover:bg-stone-200 p-4 border-t border-b text-xs  bg-stone-300 text-[#1E293B] flex">
        <span className=" hover:ml-2 flex items-center text-xl font-bold  transition-all duration-500">
          Category
        </span>

        <span className="font-bold  text-xl ml-auto">Rating </span>
      </div>
    </div>
  );
};
export default ShopItem;
