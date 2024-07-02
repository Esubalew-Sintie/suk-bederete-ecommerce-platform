"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/loading";
import { useGetshopQuery } from "@/lib/features/shop/shop";
export default function cartPage({ params }) {
  const shopId = params.shopId;
  const [shopCartPage, setShopCartPage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  useEffect(() => {
    if (data) {
      const shopCartPageData = data.find(
        (page) => page.name === "shopping-cart"
      );
      setShopCartPage(shopCartPageData);
    }
  }, [data]);

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      router.push(`/${shopId}/shopping-cart`);
    };

    const shoppingCartLink = document.getElementById("shopping-cart");
    if (shoppingCartLink) {
      shoppingCartLink.addEventListener("click", handleClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (shoppingCartLink) {
        shoppingCartLink.removeEventListener("click", handleClick);
      }
    };
  }, [router, shopId]);

  // useEffect(() => {
  //   const totalOrderPriceContainer =
  //     document.getElementById("total-order-price");
  //   const cartItemsContainer = document.getElementById("cart-items-container");
  //   const storedCart = JSON.parse(localStorage.getItem("cart"));
  //   console.log("the first stored cart ", storedCart);
  //   if (!storedCart) {
  //     if (cartItemsContainer) {
  //       console.log("set stored card empty");
  //       cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
  //       totalOrderPriceContainer.innerHTML = "";
  //     }
  //   }
  //   console.log("rendered", JSON.parse(localStorage.getItem("cart")));
  //   if (cartItemsContainer) {
  //     cartItemsContainer.innerHTML = `<div class="title">Shopping Cart</div>`;
  //   }
  // }, [shopCartPage.html]);

  useEffect(() => {
    const totalOrderPriceContainer =
      document.getElementById("total-order-price");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    console.log("the first stored cart ", storedCart);
    if (!storedCart) {
      if (cartItemsContainer) {
        console.log("set stored card empty");
        cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        totalOrderPriceContainer.innerHTML = "";
      }
    }
    console.log("rendered", JSON.parse(localStorage.getItem("cart")));
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `<div class="title">Shopping Cart</div>`;
    }
    // const cartItemsContainer = document.getElementById("cart-items-container");
    // const totalOrderPriceContainer =
    //   document.getElementById("total-order-price");
    let totalPrice = 0;
    // const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      storedCart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.setAttribute("data-id", item.id);
        cartItem.innerHTML = `
        <div class="buttons">
          <span class="delete-btn" data-id="${item.id}"><i class="fa-solid fa-xmark"></i></span>
        </div>
        <div class="image" >
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="description">
          <span class="name">${item.name}</span>
        </div>
        <div class="quantity">
          <button class="plus-btn" type="button" name="button">
            <img src="/images/plus.svg" alt="Increase quantity" />
          </button>
          <input type="text" name="name" value="${item.quantity}" />
          <button class="minus-btn" type="button" name="button">
            <img src="/images/minus.svg" alt="Decrease quantity" />
          </button>
        </div>
        <div class="total-price">${item.price}</div>
      `;
        if (cartItemsContainer) {
          cartItemsContainer.appendChild(cartItem);
        }
        const itemTotalPrice = parseInt(item.quantity) * parseFloat(item.price);
        totalPrice += itemTotalPrice;
      });

      if (totalOrderPriceContainer) {
        totalOrderPriceContainer.innerHTML =
          storedCart
            .map(
              (item) =>
                `<div>
         <span>${item.name}</span>
         <span class="calculated-value">${item.quantity} x ${item.price} = ${
                  parseInt(item.quantity) * parseFloat(item.price)
                }</span>
       </div>`
            )
            .join("") +
          `<div class="calculated-value">Total: ${totalPrice}</div>`;
      }
    }
    const deleteCartItem = (itemId) => {
      let storedCart = JSON.parse(localStorage.getItem("cart"));
      if (!storedCart || !Array.isArray(storedCart)) {
        return;
      }

      storedCart = storedCart.filter((item) => item.id !== itemId);

      localStorage.setItem("cart", JSON.stringify(storedCart));
      setCartItems(storedCart);
    };

    const updateCartItemQuantity = (itemId, change) => {
      let storedCart = JSON.parse(localStorage.getItem("cart"));
      if (!storedCart || !Array.isArray(storedCart)) {
        return;
      }

      const item = storedCart.find((item) => item.id === itemId);
      if (item) {
        item.quantity += change;

        if (item.quantity < 1) {
          item.quantity = 1;
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));

        setCartItems(storedCart);
      }
    };

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget.getAttribute("data-id");
        deleteCartItem(itemId);
      });
    });
    document.querySelectorAll(".plus-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget
          .closest(".item")
          .getAttribute("data-id");
        updateCartItemQuantity(itemId, 1);
      });
    });

    document.querySelectorAll(".minus-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget
          .closest(".item")
          .getAttribute("data-id");
        updateCartItemQuantity(itemId, -1);
      });
    });
    setCartItems(storedCart);
    setTotalOrderPrice(totalPrice);
  }, [cartItems]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!shopCartPage) {
    return <div>No home page found.</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: shopCartPage.html }} />
      <style>{shopCartPage.css}</style>
      <script>{shopCartPage.js}</script>
    </div>
  );
}
