"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {DialogFooter} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState, useRef, useEffect} from "react";
import {useCreateProductMutation} from "@/lib/features/products/products";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Product name must be at least 2 characters.",
	}),
	category: z.string().min(2, {
		message: "Product category must be at least 2 characters.",
	}),
	price: z.string().min(0, {
		message: "Product price must be a positive number.",
	}),
	stock: z.string().min(0, {
		message: "Product amount must be a positive number.",
	}),
	description: z.string().optional(),
});

export function ProductForm() {
	const [products, setProducts] = useState([]);
	const [selectedProductIndex, setSelectedProductIndex] = useState(null);
	const [mode, setMode] = useState("add");
	const [createProduct, {isLoading, isError}] = useCreateProductMutation();
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const productNameRef = useRef(null);
	const productCategoryRef = useRef(null);
	const productPriceRef = useRef(null);
	const productAmountRef = useRef(null);
	const productImageRef = useRef(null);
	const productDescriptionRef = useRef(null);
	const merchantId = localStorage.getItem("unique_id");

	const onSubmit = async (data) => {
    let formData = new FormData();
  
    // Append all form data except the image
    for (let key in data) {
      formData.append(key, data[key]);
    }
  
    // Append the image file
    // if (productImageRef.current.files.length > 0) {
    //   formData.append('image', productImageRef.current.files[0]);
    // }
  
    if (mode === "edit") {
      // Update existing product
      const updatedProducts = products.map((product, index) => {
        if (product.category === data.category) {
          // Clone the product object to avoid mutating the original state
          const updatedProduct = {...product };
          updatedProduct.image = productImageRef.current.files[0]; // Directly assign the file
          return updatedProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
      form.reset({ ...data });
    } else {
      // Define productObject here
      let productObject = {
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        description: data.description,
        // image: productImageRef.current.files[0],
      };
  
      // Add new product
      setProducts([...products, productObject]);
    }
  
    form.reset(); // Reset form
    productNameRef.current.value = "";
    productCategoryRef.current.value = "";
    productPriceRef.current.value = "";
    productAmountRef.current.value = "";
    productImageRef.current.value = ""; // Clear the file input
    productDescriptionRef.current.value = "";
  

  };
  

	const handleEdit = (index) => {
		setSelectedProductIndex(index);
		setMode("edit");
		const product = products[index];
		const editedProduct = {...product};
		delete editedProduct.image;
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
	const saveChange = () => {
		console.log(products + "products");
		console.log(merchantId + "merchantId");
		createProduct({products, merchantId});
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
							{product.name}

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
						name="name"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Name</FormLabel>
								<FormControl>
									<Input
										name="name"
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
						name="category"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Category</FormLabel>
								<FormControl>
									<Input
										name="category"
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
						name="price"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Price</FormLabel>
								<FormControl>
									<Input
										name="price"
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
						name="stock"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Amount</FormLabel>
								<FormControl>
									<Input
										name="stock"
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
						name="image"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Image</FormLabel>
								<FormControl>
									<Input
										name="image"
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
						name="description"
						render={({field}) => (
							<FormItem>
								<FormLabel>Product Description</FormLabel>
								<FormControl>
									<Textarea
										name="description"
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
			<DialogFooter>
				<Button onClick={saveChange}>Save changes</Button>
			</DialogFooter>
		</>
	);
}
