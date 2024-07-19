"use client";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";

export default function Shop({ params }) {
  const shopId = params.shopId;
  const [homepage, setHomepage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage if available
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart;
  });

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
        return;
      } else if (link === "blog") {
        router.push(`/${shopId}/blog`);
        return;
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
      if (blogLink) {
        blogLink.addEventListener("click", (event) =>
          handleClick(event, "blog")
        );
      }
      if (contactLink) {
        contactLink.addEventListener("click", (event) =>
          handleClick(event, "contact")
        );
      }
      if (aboutLink) {
        aboutLink.addEventListener("click", (event) =>
          handleClick(event, "about")
        );
      }
      if (shopCartLink) {
        shopCartLink.addEventListener("click", (event) =>
          handleClick(event, "shopping-cart")
        );
      }

      const addToCartButtons = document.querySelectorAll(
        ".product-cart button"
      );
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
      });
    };

    // Attach event listeners when homepage content is set
    if (homepage.html) {
      attachEventListeners();
    }

    // Cleanup event listener on component unmount
    return () => {
      const blogLink = document.getElementById("blog");
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
      const addToCartButtons = document.querySelectorAll(
        ".product-cart button"
      );
      addToCartButtons.forEach((button) => {
        button.removeEventListener("click", addToCart);
      });
    };
  }, [router, shopId, homepage?.html, cart]);

  const addToCart = (event) => {
    document.querySelectorAll(".product-cart").forEach((element, index) => {
      element.id = `${index}`;
    });
    event.preventDefault();

    const productCart = event.currentTarget.closest(".product-cart");

    if (!productCart) {
      console.log("product not found");
      return;
    }
    const productId = productCart.id;
    const productName = productCart.querySelector(".name").textContent.trim();
    const productPrice = productCart
      .querySelector(".price-value")
      .textContent.trim();
    const imgElement = productCart.querySelector("img");
    const url = new URL(imgElement.src);
    const imagePath = url.pathname;

    const existingProduct = cart.find((item) => item.id === productId);
    if (!existingProduct) {
      if (cart.length === 0) {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: imagePath,
          quantity: 1,
        });
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
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
      }

      console.log("this what inside cart", cart);
      console.log(
        "Updated cart in local storage:",
        JSON.parse(localStorage.getItem("cart"))
      ); // Test local storage
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
    <div className="flex gap-14">
      <div dangerouslySetInnerHTML={{ __html: homepage.html }} />
      <style>{homepage.css}</style>
      <script>{homepage.js}</script>
    </div>
  );
}
