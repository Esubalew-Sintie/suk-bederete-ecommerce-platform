"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
import MenuBar from "../../components/MenuBar/MenuBar";

export default function Shop({ params }) {
  const shopId = params.shopId;
  const unique_id = localStorage.getItem("unique_id");
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

  // useEffect(() => {
  //   const cartItemNumber = document.getElementById("cart-item-number");
  //   if (cartItemNumber) {
  //     if (cartItems.length !== 0) {
  //       cartItemNumber.textContent = cartItems.length;
  //     } else {
  //       cartItemNumber.textContent = "";
  //     }
  //   }
  // }, [cartItems]);

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
    const proceedPaymentButton = document.getElementById("Proceed-payment-btn");
    if (proceedPaymentButton) {
      console.log("proceed to payment event listener add");
      proceedPaymentButton.addEventListener("click", handleSubmit);
    }

    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }

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
    console.log("cart items in the local storage checkout", cartItems);

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
  }, [router, shopId, checkOutPage?.html, cartItems]);

  useEffect(() => {
    const proceedPaymentButton = document.getElementById("Proceed-payment-btn");
    if (proceedPaymentButton) {
      console.log("proceed to payment event listener add in use Effect");
      proceedPaymentButton.addEventListener("click", handleSubmit);
    }
  }, [customerData]);

  const handleSubmit = async () => {
    console.log("handle submit called");
    let firstName = document.getElementById("first-name-input")?.value;
    let lastName = document.getElementById("last-name-input")?.value;
    let phoneNumber = document.getElementById("phone-number-input")?.value;
    let provinceAddress = document.getElementById(
      "province-address-input"
    )?.value;
    let streetAddress = document.getElementById("street-address-input")?.value;
    let city = document.getElementById("city-input")?.value;
    let country = document.getElementById("country-input");
    let state = document.getElementById("state-input")?.value;
    let zipCode = document.getElementById("zip-code-input")?.value;
    const checkoutData = {
      firstName,
      lastName,
      phoneNumber,
      streetAddress,
      provinceAddress,
      country,
      city,
      state,
      zipCode,
    };
    console.log("checkout data ", checkoutData);
    console.log("handle form submit called");

    // try {
    //   const response = await fetch(
    //     `http://localhost:8000/auth/customer/update/${unique_id}/`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...checkoutData, uid: uid }),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Failed to submit form");
    //   }

    //   const result = await response.json();
    //   console.log("Customer created:", result);
    //   // Handle successful creation, e.g., redirect or show a success message
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   // Handle error, e.g., show an error message
    // }

    // handle customer order
    const defaultProductValues = {
      slug: "default-slug",
      productHolder: "merchant-id-here",
      stock: 10,
      is_available: true,
      category: 1,
      description: "Default description",
    };

    const orderItems = cartItems.map((item) => ({
      product: {
        name: item.name,
        slug: defaultProductValues.slug,
        productHolder: defaultProductValues.productHolder,
        image: item.image,
        stock: defaultProductValues.stock,
        is_available: defaultProductValues.is_available,
        category: defaultProductValues.category,
        price: parseFloat(item.price),
        description: defaultProductValues.description,
      },
      quantity_ordered: parseInt(item.quantity),
    }));

    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.price) * parseInt(item.quantity);
    });
    const Order = {
      customer: unique_id,
      merchant: shopId,
      total_amount: totalPrice,
      order_status: "pending",
      payment_status: "Paid",
      payment_method: "Credit Card",
      shipping_option: {
        name: "Standard Shipping",
        cost: 5.0,
        delivery_time: "1 00:00:00",
      },
      order_items: orderItems,
    };
    setCustomerData(checkoutData);
  };

  const handleOrderData = () => {};

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
