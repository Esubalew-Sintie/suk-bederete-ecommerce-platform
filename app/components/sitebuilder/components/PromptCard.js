import * as React from "react";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {PromptForm} from "./PromptForm";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Prompt2 from "./Prompt2";

export function PromptCard({link, prompt, skip}) {
	return (
		<Card className="w-[650px] h-[600px] flex flex-col gap-y-4 justify-center items-center shadow-lg">
			{prompt == "prompt1" && <CardHeader className='mb-5 '>
				<CardTitle>Select Type of Shop</CardTitle>
			</CardHeader>}
			<CardContent>
				{prompt == "prompt1" ? <PromptForm /> : <Prompt2 />}
			</CardContent>
			<CardFooter className="flex justify-between gap-4">
				{prompt == "prompt2" ? (
					<div></div>
				) : (
					<Button variant="outline">
						<Link href={skip}>skip</Link>
					</Button>
				)}
				<Button asChild>
					<Link href={link}>Next</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
