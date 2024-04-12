"use client";
import React from "react";
import ShopItem from "./Shopitem";
import Searchbox from "./Searchbox";
import Banner from "./Banner";
import ProductSlider from "./ProductSlider";

const ShopCategory = () => {
  return (
    <div className="">
      <Banner />
      <div className="  max-w-[90vw] mx-auto mt-14">
        <div className="w-full ">
          <Searchbox />{" "}
        </div>
      </div>
      <div className="group flex md:text-3xl items-center justify-center my-10 text-[#9a8d69] sm:text-2xl font-light">
        <span className="w-[30%] border-[#a2a877] border-t-[1px] ">
          <hr />
        </span>
        <span className="border border-[#a2a877] py-3 px-4 rounded-full">
          Top Rated Shops{" "}
        </span>
        <span className="w-[30%] border-[#a2a877] border-t-[1px]">
          <hr />
        </span>
      </div>
      <div className="mx-auto  w-[95vw]">
        <ProductSlider />
      </div>
      <div className="  max-w-[90vw] mx-auto mt-14">
        <div className="flex text-3xl items-center justify-center my-10 text-[#a2a877] sm:2xl font-light">
          <span className="w-[30%] border-[#a2a877] border-t-[1px] ">
            <hr />
          </span>
          <span className="border border-[#a2a877] py-3 px-4 rounded-full">
            All shops{" "}
          </span>
          <span className="w-[30%] border-[#a2a877] border-t-[1px]">
            <hr />
          </span>
        </div>
        <div className="flex flex-wrap">
          <ShopItem />
          <ShopItem />
          <ShopItem />
          <ShopItem />
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
