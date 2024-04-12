import React from "react";

const Banner = () => {
  return (
    <div
      className="flex justify-center w-full relative bg-cover bg-center h-[70vh] text-white py-24 px-10 object-fill"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(124,90,7,0.5914740896358543) 19%, rgba(26,27,20,0.5550595238095238) 52%),url(https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="xl:w-1/2 lg:w-[70%] sm:w-full">
        <div>
          <p className="text-7xl font-bold mb-10">SHOP HUB</p>
          <p class="text-8xl font-thin mb-10 leading-none">
            List of shops at your{" "}
            <span className="text-orange-500 font-semibold">finger tips</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
