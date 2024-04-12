"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ShopItem from "./Shopitem";
import { useState } from "react";
const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems },
  } = rest;

  return (
    <div className="carousel-button-group">
      <button disabled={currentSlide === 0} onClick={() => previous()}>
        Previous
      </button>
      <button disabled={currentSlide === totalItems - 1} onClick={() => next()}>
        Next
      </button>
    </div>
  );
};

const ProductSlider = ({ deviceType }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 20,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 15,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
      partialVisibilityGutter: 8,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 5,
    },
  };
  return (
    <div>
      <Carousel
        swipeable={false}
        draggable={false}
        // showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={deviceType !== "mobile" ? true : false}
        // autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        // dotListClass="custom-dot-list-style"
        partialVisible={true}
        customButtonGroup={<CustomButtonGroup />}
        itemClass="carousel-item-padding-0-px, carousel-item-padding-small"
      >
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
        <ShopItem fullWidth={true} />
      </Carousel>
    </div>
  );
};

export default ProductSlider;
