"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";
import { useGetshopQuery } from "@/lib/features/shop/shop";
import MenuBar from "../../components/MenuBar/MenuBar";

export default function Shop({ params }) {
  const shopId = params.shopId;
  const [checkOutPage, setCheckOutPage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();

  const [customerData, setCustomerData] = useState({});

  const storedData = localStorage.getItem("cart");
  let initialCartItems;

  try {
    initialCartItems = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    initialCartItems = [];
  }
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (data) {
      console.log("website data ", data);
      const checkoutPageData = data.find((page) => page.name === "Checkout");
      setCheckOutPage(checkoutPageData);
    }
  }, [data]);

  useEffect(() => {
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }
  }, [cartItems]);

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
      } else if (link === "checkout") {
        router.push(`/${shopId}/checkout`);
      } else if (link == "home") {
        router.push(`/${shopId}`);
      }
    };
    const checkOutLink = document.getElementById("checkout");
    const homeLink = document.getElementById("home");
    const blogLink = document.getElementById("blog");
    const contactLink = document.getElementById("contact");
    const aboutLink = document.getElementById("about");
    const shopCartLink = document.getElementById("shopping-cart");

    if (checkOutLink) {
      checkOutLink.addEventListener("click", (event) =>
        handleClick(event, "checkout")
      );
    }
    if (homeLink) {
      homeLink.addEventListener("click", (event) => handleClick(event, "home"));
    }

    if (blogLink) {
      blogLink.addEventListener("click", (event) => handleClick(event, "blog"));
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
    const handleSubmit = () => {
      const firstName =
        document.getElementById("first-name-input")?.value || "";
      const lastName = document.getElementById("last-name-input")?.value || "";
      const phoneNumber =
        document.getElementById("phone-number-input")?.value || "";
      const streetAddress =
        document.getElementById("street-address-input")?.value || "";
      const city = document.getElementById("city-input")?.value || "";
      const country = document.getElementById("country-input");
      const state = document.getElementById("state-input")?.value || "";
      const zipCode = document.getElementById("zip-code-input")?.value || "";

      const checkoutData = {
        firstName,
        lastName,
        phoneNumber,
        streetAddress,
        city,
        state,
        zipCode,
      };
      setCustomerData(checkoutData);
      console.log("Checkout Data:", checkoutData);
    };

    const paymentButton = document.getElementById("Payment-method");
    if (paymentButton) {
      console.log("event listener add");
      paymentButton.addEventListener("click", handleSubmit);
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
      addToCartButtons.forEach((button, index) => {
        button.id = `${index}`;
        console.log("removed event to ", index);
      });
    };
  }, [router, shopId, checkOutPage?.html, customerData]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!checkOutPage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: checkOutPage.html }} />
      <style>{checkOutPage.css}</style>
      <script>{checkOutPage.js}</script>
    </div>
  );
}
