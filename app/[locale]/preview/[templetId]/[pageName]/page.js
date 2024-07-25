"use client";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation"; // Import useRouter from next/router

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";

import {
  useGetWebBuilderQuery,
  useGetWebBuildersQuery,
  useCustomisedTemplateMutation,
} from "@/lib/features/webBuilder/webBuilder";
import {
  useGetCustomisedPageQuery,
  useGetCustomizedTemplateQuery,
  useUpdatecustomizedTemplateMutation,
} from "@/lib/features/shop/shop";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/lib/features/products/products";
function PreviewPage({ params }) {
  const status = useSelector((state) => state.status.status);

  console.log(status + "status");
  // Check if "status" exists in localStorage

  const templateId = params.templetId;
  const pageName = params.pageName;
  const { data, isLoading: templateLoading } = useGetCustomisedPageQuery({
    templateId,
    pageName,
  });
  console.log(data);
  const [updateProduct, { isLoading: updateLoading, isUpdateError }] =
    useUpdateProductMutation();
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const [editedProducts, setEditedProducts] = useState(null);
  const [updatedProducts, setUpdatedProducts] = useState(null);
  const [finalUpdatedProducts, setfinalUpdatedProducts] = useState(null);
  const [message, setMessage] = useState("");
  const merchantId = localStorage.getItem("unique_id");

  const {
    data: customizedTemplateDataHook,
    refetch,
    isLoading: isLoadingQuery,
    error: queryError,
  } = useGetCustomizedTemplateQuery(merchantId);
  useCheckUnauthorized(queryError);
  console.log(customizedTemplateDataHook);

  const [
    updateCustomisedTemplate,
    { error: updateerror, isLoading: isUpdating },
  ] = useUpdatecustomizedTemplateMutation();

  useCheckUnauthorized(updateerror);
  const captureAndUploadScreenshot = async () => {
    const container = document.querySelector("#hero");

    // Check if the container is not null
    if (!container) {
      console.error("Container not found");
      return;
    }
    try {
      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL("image/png");
      const binaryData = atob(imgData.split(",")[1]);
      const dataArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        dataArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([dataArray], { type: "image/png" });
      const file = new File([blob], "screenshot.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("preview_image", file);
      const response = await fetch(
        `http://localhost:8000/shop/update-preview-image/${merchant_id}/`,
        {
          method: "PATCH",
          body: formData,
          "Content-Type": "multipart/form-data",
        }
      );

      if (response.ok) {
        setMessage("Screenshot uploaded successfully");
      } else {
        setMessage("Failed to upload screenshot");
      }
    } catch (error) {
      console.error("Error capturing or uploading screenshot:", error);
      setMessage("Error capturing or uploading screenshot");
    }
    if (finalUpdatedProducts) {
      await updateProduct(finalUpdatedProducts);
    }
    localStorage.removeItem("status");
    router.push("/admin/dashboard"); // Navigate to /admin/dashboard
  };
  const merchant_id = localStorage.getItem("unique_id");
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(merchant_id);
  const [finalContent, setFinalContent] = useState(null);
  console.log(products);
  useEffect(() => {
    // Find all elements with the class 'product-cart'
    const productsContainer = document.querySelector("#products");
    const productsPageContainer = document.querySelector("#new-arrival");
    const newArrivalContainer = document.querySelector("#new-arrival-section");

    // Clear existing content
    if (products?.featured?.length > 0 || products?.new_arrival?.length > 0) {
      if (productsContainer) {
        productsContainer.innerHTML = ""; // Clear the entire container
      }
      if (productsPageContainer) {
        productsPageContainer.innerHTML = ""; // Clear the entire container
      }
    }

    console.log("products", products?.featured);
    // Iterate over the products array
    if (!isLoading && products?.featured?.length > 0) {
      console.log("products");
      products?.featured?.forEach((product, index) => {
        console.log("products", product);
        const productHTML = generateProductHTML(product, index);
        productsContainer?.insertAdjacentHTML("beforeend", productHTML);
      });
      // Iterate over the products array
      if (!isLoading && products?.new_arrival?.length > 0) {
        products?.new_arrival?.forEach((product, index) => {
          const productHTML = generateProductHTML(product, index);
          productsPageContainer?.insertAdjacentHTML("beforeend", productHTML);
        });
      } else if (products?.length === 0) {
        newArrivalContainer.innerHTML = "";
      }

      // After replacing the content, capture the updated DOM structure
      const updatedDom = document.getElementById("dom")?.outerHTML;
      console.log("updatd dom", updatedDom);
      setFinalContent(updatedDom);
    }
  }, [products, isLoading]);

  useEffect(() => {
    setHasMounted(true);
    setTimeout(() => {
      if (hasMounted) {
        if (localStorage.getItem("status")) {
          // Retrieve the status
          const st = localStorage.getItem("status");
          if (status === "publish") {
            captureAndUploadScreenshot();
          }

          // Use the status value
          console.log(`Status: ${status}`);
        } else {
          // Handle the case where "status" does not exist
          console.log("No status found.");
        }
      }
    }, 2000); // Adjust the delay as needed
  }, [hasMounted]);
  function generateProductHTML(product) {
    // const imagePath = `${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`;
    return `
       <div class="product-cart">
      <img src="${product.image}" alt="Dynamic Product" />
      <span>${product?.name}</span>
        <h4>${product?.description}</h4>
        <div class="stars">
          <svg
                  style="display: inline"
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  style="display: inline"
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  style="display: inline"
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  style="display: inline"
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
        </div>

          <h4 class="price">$<span class="price price-value">${product?.price}</span></h4>
          <button class="product-detail-button">Product Detail</button>
          <button class="add-to-cart-button buy-icon">
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
        <p class='productId'  style="display: hidden;">${product?.id}</p>
        <span id="added-cart-message"></span>
		</div>
    `;
  }

  // State to hold the final HTML content

  // Depend on the products array to trigger the effect when products change
  const modifiedPagesData = {};

  useEffect(() => {
    modifiedPagesData[pageName] = {
      html: finalContent,
      css: data?.css,
      js: data?.js,
    };

    if (finalContent) {
      updateCustomisedTemplate({
        customised_templateId: customizedTemplateDataHook?.id,
        modifiedPages: modifiedPagesData,
      })
        .unwrap()
        .then((response) => {
          console.log("Mutation successful:", response);
        })
        .catch((error) => {
          console.error("Mutation failed:", error);
        });
    }
  }, [finalContent, customizedTemplateDataHook?.id, data?.css, data?.js]);

  //
  useEffect(() => {
    const productCarts = document.querySelectorAll(".product-cart");
    let editedProducts = [];

    productCarts.forEach((productCart) => {
      const imageSrc = productCart.querySelector("img").src;
      const name = productCart.querySelector("span").textContent.trim();
      const description = productCart.querySelector("h4").textContent.trim(); // Assuming the second h4 contains the description
      const price = productCart.querySelector(".price").textContent;
      const productId = productCart.querySelector(".productId")?.textContent;

      editedProducts.push({
        image: imageSrc,
        name: name,
        description: description,
        price: price,
        productId: productId,
      });
    });
    setUpdatedProducts(editedProducts);

    console.log(updatedProducts);
  }, [finalContent]);

  useEffect(() => {
    let updatedProductList = [];
    if (products?.length > 0 && !isLoading) {
      products?.forEach((originalProduct) => {
        const updatedProduct = updatedProducts?.find(
          (updatedProd) => updatedProd.productId === originalProduct.id
        );

        if (updatedProduct) {
          if (
            updatedProduct.image !== originalProduct.image ||
            updatedProduct.price !== originalProduct.price ||
            updatedProduct.name !== originalProduct.name ||
            updatedProduct.description !== originalProduct.description
          ) {
            updatedProductList.push({
              ...updatedProduct,
            });
          }
        } else {
          updatedProductList.push({
            ...updatedProduct,
            productId: null,
          });
        }
      });
    }
    // Assuming you want to store the result somewhere or just log it
    console.log(updatedProductList);
    setfinalUpdatedProducts(updatedProductList);
  }, [products, updatedProducts]);
  // useEffect(() => {
  // 	if (finalUpdatedProducts) {
  // 		updateProduct(finalUpdatedProducts);
  // 	}
  // }, []);
  // Log the serialized HTML to the console
  // console.log(serializedHtml +"dommmmmmmmm");
  return (
    <>
      <style>{data?.css}</style>
      {finalContent ? (
        <div dangerouslySetInnerHTML={{ __html: finalContent }} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data?.html }} />
      )}{" "}
      {/* <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} /> */}
    </>
  );
}

export default PreviewPage;
