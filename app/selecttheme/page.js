'use client'
import React from "react";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
import Footer from "../components/Footers/Footer";
import { useGetWebBuildersQuery } from "@/lib/features/webBuilder/webBuilder";


function SelectTheme() {
    const { data, error, isLoading } = useGetWebBuildersQuery()
     console.log(data);
	return (
		<div className=" mt-24 ">
			<SelectedTheme />

			<div className=" flex flex-col  m-8  mb-24 ">
				<div className=" flex  flex-col justify-center items-center mb-4">
					<h2 className=" font-bold">Popular free themes</h2>
					<p>
						made with core features you can easly customize -- no coding needed
					</p>
				</div>
				<div className=" flex w-full h-full gap-6 flex-wrap justify-center ">
					{data?.map((theme) => (
						<Theme key={theme.themeName} theme={theme} />
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default SelectTheme;
