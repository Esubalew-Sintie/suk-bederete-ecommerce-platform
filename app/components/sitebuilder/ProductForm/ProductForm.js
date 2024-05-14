"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  productCategory: z.string().min(2, {
    message: "Product category must be at least 2 characters.",
  }),
  productPrice: z.string().min(0, {
    message: "Product price must be a positive number.",
  }),
  productAmount: z.string().min(0, {
    message: "Product amount must be a positive number.",
  }),
  productImage: z.string().optional(),
  productDescription: z.string().optional(),
});

export function ProductForm() {
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [mode, setMode] = useState("add");

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const productNameRef = useRef(null);
  const productCategoryRef = useRef(null);
  const productPriceRef = useRef(null);
  const productAmountRef = useRef(null);
  const productImageRef = useRef(null);
  const productDescriptionRef = useRef(null);

  const onSubmit = (data) => {
    if (mode === "edit") {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex] = data;
      setProducts(updatedProducts);
      setSelectedProductIndex(null); // Reset selected product index
    } else {
      // Add new product
      setProducts([...products, data]);
    }
    form.reset(); // Reset form

    productNameRef.current.value = "";
    productCategoryRef.current.value = "";
    productPriceRef.current.value = "";
    productAmountRef.current.value = "";
    productImageRef.current.value = "";
    productDescriptionRef.current.value = "";
  };

  const handleEdit = (index) => {
    setSelectedProductIndex(index);
    setMode("edit");
    const product = products[index];
    const editedProduct = { ...product };
    delete editedProduct.productImage;
    form.reset(editedProduct);
  };

  const handleAddNewProduct = () => {
    setMode("add");
  };
  const handleDeleteProduct = (index, e) => {
    e.stopPropagation();
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };
  return (
    <>
      <div>
        <div className="mt-4 flex  flex-wrap">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative cursor-pointer text-white bg-[#272e3f] px-3 py-3 rounded-lg my-1 mx-2 group"
              onClick={() => handleEdit(index)}
            >
              {product.productName}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="absolute  top-[-10px] right-[-10px] w-6 h-6 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                onClick={(e) => handleDeleteProduct(index, e)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    name="productName"
                    className="w-[50%]"
                    placeholder="Product Name"
                    {...field}
                    ref={productNameRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide a standard commercial name of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input
                    name="productCategory"
                    className="w-[50%]"
                    placeholder="Product Category"
                    {...field}
                    ref={productCategoryRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide a standard commercial category of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    name="productPrice"
                    type="number"
                    className="w-[50%]"
                    placeholder="Product Price"
                    {...field}
                    ref={productPriceRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide the price of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Amount</FormLabel>
                <FormControl>
                  <Input
                    name="productAmount"
                    type="number"
                    className="w-[50%]"
                    placeholder="Product Amount"
                    {...field}
                    ref={productAmountRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide how much of these product available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    name="productImage"
                    type="file"
                    className="w-[30%]"
                    placeholder="Product Category"
                    {...field}
                    ref={productImageRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide a standard commercial image of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    name="productDescription"
                    className="w-[50%]"
                    placeholder="Product Description"
                    {...field}
                    ref={productDescriptionRef}
                  />
                </FormControl>
                <FormDescription>
                  Provide a short description of the product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex">
        {mode === "edit" && (
          <Button onClick={handleAddNewProduct}>Add New Product</Button>
        )}
      </div>
    </>
  );
}
