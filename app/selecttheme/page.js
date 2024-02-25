import React from "react";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
const themes = [
	{
		themeName: "Theme1",
		url:"/pro.jpg"
	},
	{
		themeName: "Theme6",
		url:"/pro1.jpg"
	},
	{
		themeName: "Theme2",
		url:"/pro2.jpg"
	},
	{
		themeName: "Theme3",
		url:"/pr3.jpg"
	},
	{
		themeName: "Theme4",
		url:"/pro4.jpg"
	},
	{
		themeName: "Theme5",
		url:"/pro5.jpg"
	}
]

function SelectTheme() {
	return (
		<div>
			<SelectedTheme />
		
		<div className=" flex flex-col border m-8  ">
			<div className=" flex  flex-col justify-center items-center mb-4">
				<h2 className=" font-bold">Popular free themes</h2>
				<p>
					made with core features you can easly customize -- no coding needed
				</p>
			</div>
			<div className=" flex w-full h-full gap-6 flex-wrap justify-center ">
					{
						themes.map(theme => (
							<Theme key={theme.themeName} theme={theme} />
						))
				}
			</div>
			</div>
			</div>
	);
}

export default SelectTheme;
