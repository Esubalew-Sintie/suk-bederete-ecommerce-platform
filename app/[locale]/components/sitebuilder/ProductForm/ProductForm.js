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
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductMutation } from "@/lib/features/products/products";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Product category must be at least 2 characters.",
  }),
  price: z.preprocess(
    (value) => parseFloat(value),
    z.number().nonnegative({
      message: "Product price must be a positive number.",
    }),
  ),
  stock: z.preprocess(
    (value) => parseInt(value),
    z.number().nonnegative({
      message: "Product amount must be a positive number.",
    }),
  ),
  description: z.string().optional(),
});

export function ProductForm() {
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [mode, setMode] = useState("add");
  const [imageFile, setImageFile] = useState(null);
  const [createProduct, { isLoading, isError }] = useCreateProductMutation();

  const defaultValues = {
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  };
  const merchantId = localStorage.getItem("unique_id");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    // Ensure the imageFile is included in the product data
    
    const productData = { ...data, image: imageFile };
    
    
    if (mode === "edit" && selectedProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex] = productData;
      setProducts(updatedProducts);
      form.reset({ ...productData, image: null }); // Reset form with current values except image
    } else {
      setProducts([...products, productData]);
      form.reset(defaultValues); // Reset form with default values
    }
    
    
  };

  const handleEdit = (index) => {
    setSelectedProductIndex(index);
    setMode("edit");
    const product = products[index];
    form.reset({ ...product, image: null });
    setImageFile(product.image || null); // Set the image file state
  };

  const handleAddNewProduct = () => {
    setSelectedProductIndex(null);
    setMode("add");
    form.reset(defaultValues);
    setImageFile(null); // Reset the image file state
  };

  const handleDeleteProduct = (index, e) => {
    e.stopPropagation();
    const updatedProducts = products.filter((product, i) => i !== index);
    setProducts(updatedProducts);
  };
 
  const imageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("merchantId", merchantId);
  
      products.forEach((product, index) => {
        for (const key in product) {
          if (product.hasOwnProperty(key)) {
            if (key === 'image' && product[key]) {
              formData.append(`products[${index}][${key}]`, product[key]);
            } else {
              formData.append(`products[${index}][${key}]`, product[key]);
            }
          }
        }
      });
  
      // Log the FormData contents
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      await createProduct(formData).unwrap();
      toast.success("Products added successfully!");
      
      // Clear the products list
      setProducts([]);
    } catch (error) {
      toast.error("Failed to add products. Please try again.");
      console.error(error);
    }
  };
  
  
  

  return (
    <>
      <div>
        <div className="mt-4 flex flex-wrap">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative cursor-pointer text-white bg-[#272e3f] px-3 py-2 rounded-lg my-1 mx-2 group"
              onClick={() => handleEdit(index)}
            >
              {product.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute top-[-10px] right-[-10px] w-6 h-6 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                onClick={(e) => handleDeleteProduct(index, e)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    name="name"
                    className="w-[50%]"
                    placeholder="Product Name"
                    {...field}
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input
                    name="category"
                    className="w-[50%]"
                    placeholder="Product Category"
                    {...field}
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    name="price"
                    type="number"
                    className="w-[50%]"
                    placeholder="Product Price"
                    {...field}
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
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Amount</FormLabel>
                <FormControl>
                  <Input
                    name="stock"
                    type="number"
                    className="w-[50%]"
                    placeholder="Product Amount"
                    {...field}
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="picture">Picture</Label>
                <FormControl>
                  <Input
                   id="picture"
                    name="image"
                    type="file"
                    className="w-[30%]"
                    placeholder="Product Image"
                    onChange={imageUpload}
                  />
                </FormControl>
                <FormDescription>
                  {mode === "edit" && !field.value ? (
                    <span>Please re-upload the product image</span>
                  ) : (
                    "Provide a standard commercial image of the product"
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    name="description"
                    className="w-[50%]"
                    placeholder="Product Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a short description of the product.
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
          <div>
            <Button onClick={handleAddNewProduct}>Add New Product</Button>
            <p className="text-sm text-[#272e3f]">
              To continue adding new product
            </p>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={saveChanges} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
      <ToastContainer />
    </>
  );
}
