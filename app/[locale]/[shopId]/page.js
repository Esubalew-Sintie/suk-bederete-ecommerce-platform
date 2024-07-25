"use client";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
import MenuBar from "../components/MenuBar/MenuBar";

export default function Shop({ params }) {
  const shopId = params.shopId;
  const [homepage, setHomepage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [numberOfItems, setNumberOfItems] = useState(cart.length);

  useEffect(() => {
    if (data) {
      console.log("website data ", data);
      const homePageData = data.find((page) => page.name === "Home");
      setHomepage(homePageData);
    }
  }, [data]);

  useEffect(() => {
    const handleClick = (event, link) => {
      event.preventDefault();
      if (link === "contact") {
        router.push(`/${shopId}/contact`);
      } else if (link === "blog") {
        router.push(`/${shopId}/blog`);
      } else if (link === "about") {
        router.push(`/${shopId}/about`);
      } else if (link === "shopping-cart") {
        router.push(`/${shopId}/shopping-cart`);
      }
    };

    const attachEventListeners = () => {
      const blogLink = document.getElementById("blog");
      const contactLink = document.getElementById("contact");
      const aboutLink = document.getElementById("about");
      const shopCartLink = document.getElementById("shopping-cart");

<<<<<<< HEAD
      if (blogLink) {
        blogLink.addEventListener("click", (event) => handleClick(event, "blog"));
      }
      if (contactLink) {
        contactLink.addEventListener("click", (event) => handleClick(event, "contact"));
      }
      if (aboutLink) {
        aboutLink.addEventListener("click", (event) => handleClick(event, "about"));
      }
      if (shopCartLink) {
        shopCartLink.addEventListener("click", (event) => handleClick(event, "shopping-cart"));
      }

      const addToCartButtons = document.querySelectorAll(".product-cart .add-to-cart-button");
      addToCartButtons.forEach((button, index) => {
        button.id = `${index}`;
        console.log("attached event to ", index);
        button.addEventListener("click", addToCart);
      });

      const productDetailButtons = document.querySelectorAll(".product-cart .product-detail-button");
      productDetailButtons.forEach((button) => {
        button.addEventListener("click", handleProductDetail);
      });
    };

    const detachEventListeners = () => {
      const blogLink = document.getElementById("blog");
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }

      const addToCartButtons = document.querySelectorAll(".product-cart .add-to-cart-button");
      addToCartButtons.forEach((button) => {
        button.removeEventListener("click", addToCart);
      });

      const productDetailButtons = document.querySelectorAll(".product-cart .product-detail-button");
      productDetailButtons.forEach((button) => {
        button.removeEventListener("click", handleProductDetail);
      });
    };

    attachEventListeners();
    return () => detachEventListeners();
  }, [router, shopId, homepage?.html]);
=======
    const addToCartButtons = document.querySelectorAll(
      ".product-cart .add-to-cart-button"
    );
    addToCartButtons.forEach((button, index) => {
      button.id = `${index}`;
      console.log("attached event to ", index);
      button.addEventListener("click", addToCart);
    });

    const productDetailButton = document.querySelectorAll(
      ".product-cart .product-detail-button"
    );
    productDetailButton.forEach((button) => {
      button.addEventListener("click", handleProductDetail);
    });

    // Cleanup event listener on component unmount
    // return () => {
    //   const blogLink = document.getElementById("blog");
    //   if (blogLink) {
    //     blogLink.removeEventListener("click", handleClick);
    //   }
    //   const addToCartButtons = document.querySelectorAll(
    //     ".product-cart button"
    //   );
    //   addToCartButtons.forEach((button, index) => {
    //     button.id = `${index}`;
    //     console.log("removed event to ", index);
    //     return button.removeEventListener("click", addToCart);
    //   });
    // };
  }, [router, shopId, homepage?.html, cart, numberOfItems]);
>>>>>>> main

  useEffect(() => {
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      cartItemNumber.textContent = cart.length;
    }
  }, [cart]);

  const handleProductDetail = (event) => {
    event.preventDefault();
    const productCart = event.currentTarget.closest(".product-cart");

    if (!productCart) {
      console.log("product not found");
      return;
    }

    const productId = productCart.id;
    const productName = productCart.querySelector(".name").textContent.trim();
    const productPrice = productCart.querySelector(".price-value").textContent.trim();
    const imgElement = productCart.querySelector("img");
    const url = new URL(imgElement.src);
    const imagePath = url.pathname;

    const productItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: imagePath,
      quantity: 1,
    };

    localStorage.setItem("productDetailItem", JSON.stringify(productItem));
    router.push(`/${shopId}/product-detail`);
  };

  const addToCart = (event) => {
    event.preventDefault();
    const productCart = event.currentTarget.closest(".product-cart");

    if (!productCart) {
      console.log("product not found");
      return;
    }

    const productId = productCart.id;
    const productName = productCart.querySelector(".name").textContent.trim();
    const productPrice = productCart.querySelector(".price-value").textContent.trim();
    const imgElement = productCart.querySelector("img");
    const url = new URL(imgElement.src);
    const imagePath = url.pathname;

    const existingProduct = cart.find((item) => item.id === productId);
    if (!existingProduct) {
      const updatedCart = [
        ...cart,
        {
          id: productId,
          name: productName,
          price: productPrice,
          image: imagePath,
          quantity: 1,
        },
      ];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setNumberOfItems(updatedCart.length);
    } else {
      console.log(`Product already in cart: ${productName}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!homepage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <style>{homepage.css}</style>
      <div className="fixed rounded-full z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: homepage.html }} />
      
      <script>{homepage.js}</script>
    </div>
  );
}
