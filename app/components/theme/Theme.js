import Image from "next/image";
import Link from "next/link";
import React from "react";

function Theme({theme}) {
	return (
		<div className=" w-80 h-80 text-black pb-6 bg-blue-400  border rounded-md">
			<Image src={theme.url} alt={theme.url} width={300} height={300} />

			<div className=" bg-red-300 flex justify-between mt-2 mx-1">
				<div className=" flex flex-col">
					<Link href="refresh" className=" underline mb-2">
						{theme.themeName}
					</Link>
					<p>By Suk Bederete</p>
				</div>
				<button className=" bg-green-600 px-4  rounded-md border">Add </button>
			</div>
		</div>
	);
}

export default Theme;
