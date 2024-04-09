"use client";

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
import {toast} from "@/components/ui/use-toast";
import Image from "next/image";

const items = [
	{
		id: "Jolery and cosmotics",
		label: "Jewelry and cosmotics",
		imgUrl: "/cosmotics.png",
	},
	{
		id: "Electronis",
		label: "Electronis",
		imgUrl: "/electronics.jpg",
	},
	{
		id: "Cloth",
		label: "Cloth",
		imgUrl: "/cloth.jpg",
	},
	{
		id: "Shoes",
		label: "Shoes",
		imgUrl: "/shoes.jpg",
	},
];

// Adjust the schema to reflect a single selection
const FormSchema = z.object({
	items: z.string().optional(),
});

export function PromptForm() {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: "", // Default to an empty string or the ID of a default item
		},
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="items"
					render={() => (
						<FormItem>
							{items.map((item) => (
								<FormItem
									key={item.id}
									className="flex flex-row items-start space-x-3 space-y-0"
								>
									<FormControl>
										{/* Custom radio button implementation */}
										<input
											type="radio"
											name="items"
											value={item.id}
											checked={form.watch("items") === item.id}
											onChange={(e) => form.setValue("items", e.target.value)}
											className="form-radio text-blue-600"
										/>
									</FormControl>
									<FormLabel className="flex gap-5 font-bold text-xl">
										<Image
											src={item.imgUrl}
											width={40}
											height={40}
											className=" rounded-full"
										/>
										{item.label}
									</FormLabel>
								</FormItem>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
