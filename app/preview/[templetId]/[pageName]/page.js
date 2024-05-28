"use client";
import html2canvas from "html2canvas";
import {useRouter} from "next/navigation"; // Import useRouter from next/router

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
	useGetWebBuilderQuery,
	useGetWebBuildersQuery,
	
	useCustomisedTemplateMutation,
} from "@/lib/features/webBuilder/webBuilder";
import { useGetCustomisedPageQuery, 
	useGetCustomizedTemplateQuery,
	useUpdatecustomizedTemplateMutation,} from "@/lib/features/shop/shop";
import {
	useGetProductsQuery,
	useUpdateProductMutation,
} from "@/lib/features/products/products";
function PreviewPage({params}) {
	const status = useSelector((state) => state.status.status);
	console.log(status + "status");
	// Check if "status" exists in localStorage

	const templateId = params.templetId;
	const pageName = params.pageName;
	const {data, isLoading: templateLoading} = useGetCustomisedPageQuery({
		templateId,
		pageName,
	});
	const [updateProduct, {isLoading: updateLoading, isUpdateError}] =
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
  const [updateCustomizedTemplate, { isLoading: isUpdating }] =
  useUpdatecustomizedTemplateMutation();
	const captureAndUploadScreenshot = async () => {
		const container = document.querySelector("#features");

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
			const blob = new Blob([dataArray], {type: "image/png"});
			const file = new File([blob], "screenshot.png", {type: "image/png"});
			const formData = new FormData();
			formData.append("image", file);
			const response = await fetch("http://localhost:8000/shop/upload/", {
				method: "POST",
				body: formData,
			});

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
	const {data: products, isLoading, isError} = useGetProductsQuery(merchant_id);
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
				const productHTML = generateProductHTML(product);
				productsContainer?.insertAdjacentHTML("beforeend", productHTML);
			});
			// Iterate over the products array
			if (!isLoading && products?.new_arrival?.length > 0) {
				products?.new_arrival?.forEach((product, index) => {
					const productHTML = generateProductHTML(product);
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
					if (st === "publish") {
						captureAndUploadScreenshot();
					}

					// Use the status value
					console.log(`Status: ${st}`);
				} else {
					// Handle the case where "status" does not exist
					console.log("No status found.");
				}
			}
		}, 2000); // Adjust the delay as needed
	}, [hasMounted]);
	function generateProductHTML(product) {
		const imagePath = `${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`;
		return `
       <div class="product-cart">
      <img src="${imagePath}" alt="Dynamic Product" />
      <span>${product?.name}</span>
        <h4>${product?.description}</h4>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <h4 class="price">$${product?.price}</h4>
        <p class='productId'  style="display: hidden;">${product?.id}</p>
        <a href="#" class="fa-solid fa-cart-shopping buy-icon"></a>
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
			customisedTemplate({
				originalTemplateId: templateId,
				modifiedMerhant: merchantId,
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
				<div dangerouslySetInnerHTML={{__html: finalContent}} />
			) : (
				<div dangerouslySetInnerHTML={{__html: data?.html}} />
			)}{" "}
			{/* <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} /> */}
		</>
	);
}

export default PreviewPage;
