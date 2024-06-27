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
import Link from "next/link";

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

export function PromptForm({link}) {
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
		<div className=" flex  flex-col gap-8">
			{items.map((item) => (
				<Button asChild className=" w-80 flex justify-start">
					<Link href={link} className=" flex justify-start gap-x-6 ">
						<Image
							src={item.imgUrl}
							width={20}
							height={20}
							className="mr-2 h-8 w-8 rounded-full"
						/>{" "}
						<p>{item.label}</p>
					</Link>
				</Button>
			))}
		</div>
	);
}
