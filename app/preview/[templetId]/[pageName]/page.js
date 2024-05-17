"use client"
import html2canvas from "html2canvas";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useGetWebBuilderQuery,useGetCustomisedPageQuery, useGetWebBuildersQuery, useGetCustomizedTemplateQuery, useUpdatecustomizedTemplateMutation } from '@/lib/features/webBuilder/webBuilder';
import { useGetProductsQuery } from "@/lib/features/products/products";
function PreviewPage({params}) {
   const status = useSelector((state) => state.status.status);
  console.log(status + 'status')
// Check if "status" exists in localStorage


const templateId = params.templetId;
const pageName = params.pageName;
const { data, isLoading: templateLoading } = useGetCustomisedPageQuery({ templateId, pageName });
const [hasMounted, setHasMounted] = useState(false);
const router = useRouter(); // Initialize useRouter

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
  const container = document.querySelector('#features');

  // Check if the container is not null
  if (!container) {
    console.error('Container not found');
    return;
  }
  try {
    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');
    const binaryData = atob(imgData.split(",")[1]);
    const dataArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([dataArray], { type: "image/png" });
    const file = new File([blob], "screenshot.png", { type: "image/png" });
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
  localStorage.removeItem("status");
  router.push('/admin/dashboard'); // Navigate to /admin/dashboard

};

const {data:products,isLoading,isError}=useGetProductsQuery()
const [finalContent, setFinalContent] = useState(null);

  useEffect(() => {

  // Find all elements with the class 'product-cart'
  const productCartElements = document.querySelectorAll('.product-cart');

    // Iterate over the products array
    if (!isLoading && products.length > 0) {
      products?.forEach((product, index) => {
        // Check if there's a corresponding.product-cart element
        if (productCartElements[index]) {
          // Generate the HTML for the current product
          const productDetails = generateProductHTML(product);
      
          // Replace the innerHTML of the selected.product-cart element
          productCartElements[index].innerHTML = productDetails;
        }
      });

      // After replacing the content, capture the updated DOM structure
      const updatedDom = document.getElementById('dom')?.outerHTML;
      setFinalContent(updatedDom)
      // console.log(updatedDom + " Updated DOM content after replacing product carts");
    }
}, [products,isLoading]);

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
      <img src="${imagePath}" alt="Dynamic Product" />
      <span>${product.name}</span>
        <h4>${product.description}</h4>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <h4 class="price">$${product.price}</h4>
        <a href="#" class="fa-solid fa-cart-shopping buy-icon"></a>
    `;
  }
 

 // State to hold the final HTML content
 
 // Depend on the products array to trigger the effect when products change

 useEffect(() => {
  if (finalContent) {
    updateCustomizedTemplate({
      CustomtemplateId: customizedTemplateDataHook?.id,
      modifiedPages: {
        pageName: {
          html: finalContent,
          css: data?.css,
          js: data?.js
        }
      },
    })
   .unwrap()
   .then(response => {
      console.log('Mutation successful:', response);
    })
   .catch(error => {
      console.error('Mutation failed:', error);
    });
  }
}, [finalContent, customizedTemplateDataHook?.id, data?.css, data?.js]);

  
useEffect(() => {
  const productCarts = document.querySelectorAll('.product-cart');
  let editedProducts = [];

  productCarts.forEach(productCart => {
    const imageSrc = productCart.querySelector('img').src;
    const name = productCart.querySelector('span').textContent.trim();
    const description = productCart.querySelector('h4').textContent.trim(); // Assuming the second h4 contains the description
    const price = productCart.querySelector('.price').textContent;

    editedProducts.push({
      image: imageSrc,
      name: name,
      description: description,
      price: price
    });
  });

  console.log(editedProducts);
}, [finalContent]);

  
  // Log the serialized HTML to the console
  // console.log(serializedHtml +"dommmmmmmmm");
  return (
    <>
    <style>{data?.css}</style>
      {finalContent ?
        <div dangerouslySetInnerHTML={{ __html: finalContent }} />:
        <div dangerouslySetInnerHTML={{ __html: data?.html }} />
}      {/* <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} /> */}
    </>
  )
}

export default PreviewPage
