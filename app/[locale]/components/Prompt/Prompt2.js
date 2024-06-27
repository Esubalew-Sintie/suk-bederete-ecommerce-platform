"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

// Define your Zod schema for validation
const schema = z.object({
	name: z.string().min(1, "Name is required"),
	phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
	address: z.string().min(1, "Address is required"),
	kebele: z.string().min(1, "Kebele is required"),
	city: z.string().min(1, "City is required"),
});

const Prompt2 = () => {
	const [isChecked, setIsChecked] = useState(false);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({
		resolver: zodResolver(schema),
	});

	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	};

	const onSubmit = (data) => {
		console.log(data);
		// Here you can handle the form submission, e.g., send it to a server
	};

	return (
		<div className="bg-white shadow-xl border-[1px] border-slate-1 rounded-sm 00 p-6 max-w-md mx-auto">
			<input
				checked={isChecked}
				type="checkbox"
				onChange={handleCheckboxChange}
				label="Use client"
				id="physical-shop"
			/>
			<label htmlFor="physical-shop" className=" text-xl">
				{" "}
				Do you have physical shop
			</label>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
				{isChecked ? (
					<>
						<div>
							<label htmlFor="name">Name</label>
							<Input id="name" name="name" {...register("name")} />
							{errors.name && <p>{errors.name.message}</p>}
						</div>
						<div>
							<label htmlFor="kebele">Kebele</label>
							<Input id="kebele" name="kebele" {...register("kebele")} />
							{errors.kebele && <p>{errors.kebele.message}</p>}
						</div>
						<div>
							<label htmlFor="city">City</label>
							<Input id="city" name="city" {...register("city")} />
							{errors.city && <p>{errors.city.message}</p>}
						</div>
						<div>
							<label htmlFor="phoneNumber">Phone Number</label>
							<Input
								id="phoneNumber"
								name="phoneNumber"
								{...register("phoneNumber")}
							/>
							{errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
						</div>
					</>
				) : (
					<>
						<div>
							<label htmlFor="userName">User Name</label>
							<Input id="userName" name="userName" {...register("userName")} />
							{errors.userName && <p>{errors.userName.message}</p>}
						</div>
						<div>
							<label htmlFor="phoneNumber">Phone Number</label>
							<Input
								id="phoneNumber"
								name="phoneNumber"
								{...register("phoneNumber")}
							/>
							{errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
						</div>
						<div>
							<label htmlFor="address">Address</label>
							<Input id="address" name="address" {...register("address")} />
							{errors.address && <p>{errors.address.message}</p>}
						</div>
					</>
				)}
			</form>
		</div>
	);
};

export default Prompt2;
