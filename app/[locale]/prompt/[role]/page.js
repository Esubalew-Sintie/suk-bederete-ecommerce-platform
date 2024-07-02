"use client";
import React from "react";
import MerchantForm from "../../components/Prompt/MerchantForm";
import CustomerForm from "../../components/Prompt/CustomerForm";
import Loader from "../../components/Prompt/Loader";

const MerchantSignup = ({ params }) => {
  const { role } = params;
  console.log(role);
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("/api/create-merchant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Merchant created:", result);
      // Handle successful creation, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
    }
  };
  if (!role) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        {role == "merchant" ? "Merchant Signup" : "Customer Signup"}{" "}
      </h1>
      {role == "merchant" ? (
        <MerchantForm onSubmit={handleFormSubmit} />
      ) : (
        <CustomerForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default MerchantSignup;
