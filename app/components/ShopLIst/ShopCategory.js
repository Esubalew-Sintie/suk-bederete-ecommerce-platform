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
      <div className="flex text-3xl font-thin justify-center my-10 text-red-300">
        <span className="border border-red-600 py-3 px-4 rounded-full">
          Top Rated Shops
        </span>
      </div>
      <div className="mx-auto  w-[95vw]">
        <ProductSlider />
      </div>
      <div className="  max-w-[90vw] mx-auto mt-14">
        <div className="flex text-3xl font-thin justify-center my-10 text-red-300">
          <span className="border border-red-600 py-3 px-4 rounded-full">
            All Shops
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
