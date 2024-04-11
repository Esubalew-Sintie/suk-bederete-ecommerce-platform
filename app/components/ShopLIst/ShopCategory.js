import React from "react";
import ShopItem from "./Shopitem";
import Searchbox from "./Searchbox";
import Banner from "./Banner";
const ShopCategory = () => {
  return (
    <div className="">
      <Banner />
      <div className="max-w-[90vw] mx-auto my-5">
        <div className="w-full ">
          <Searchbox />{" "}
        </div>
        <div className="flex flex-wrap px-10 ">
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
