"use client";

import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {toast} from "@/components/ui/use-toast";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";

const FormSchema = z.object({
	itemType: z.string({
		required_error: "Please select an Item type to display.",
	}),
	// itemTitle: z.string({
	// 	required_error: "Required",
	// }),
	// itemPrice: z.number(),
	// description: z.string(),
	// images: z.array(),
	// shipping: z.boolean(),
});

export function AddItemForm() {
	const form = useForm({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="itemType"
					render={({field}) => (
						<FormItem>
							<FormLabel>Item type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select an item type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="physical">physical</SelectItem>
									<SelectItem value="prepared ">
										prepared food and peverage
									</SelectItem>
									<SelectItem value="donation">donation</SelectItem>
									<SelectItem value="event">event</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="itemTitle"
					render={({field}) => (
						<FormItem>
							<div className=" flex justify-between w-full">
								<FormLabel>Item title</FormLabel>
								<FormDescription>required</FormDescription>
							</div>
							<FormControl>
								<Input placeholder="cloth..." {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="itemPrice"
					render={({field}) => (
						<FormItem>
							<FormLabel>Price</FormLabel>

							<FormControl>
								<Input type="number" placeholder="0.00 ETB" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({field}) => (
						<FormItem>
							<FormLabel>description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Write a short description of your menu item"
									className="resize-none"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({field}) => (
						<FormItem>
							<FormLabel>Image</FormLabel>

							<FormControl>
								<Input type="file" placeholder="+" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name="shipping"
					render={({field}) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel>Shipping </FormLabel>
							</div>
						</FormItem>
					)}
				/> */}
			</form>
		</Form>
	);
}
