import Image from "next/image";
function SelectedTheme() {
	return (
		<div className="flex flex-col items-center ">
			<div flex flex-col items-center>
				<Image src="/pro.jpg" alt="selected theme" width={800} height={600} />
				<div className=" flex justify-between mt-2">
					<div className=" mt-2">
						<div className=" flex ">
							<p>Dawn</p>
							<p className=" ml-2 bg-green-300 px-2 py-1">current theme</p>
						</div>
						<p>added 18 min ago</p>
					</div>
					<button className=" bg-black text-white h-8 rounded-md px-2">
						Customize
					</button>
				</div>
			</div>
		</div>
	);
}

export default SelectedTheme;
