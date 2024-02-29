import React from "react";

function Padding() {
	return (
		<>
			<h3>Padding in (px)</h3>
			<div className=" flex text-black gap-2">
				<div>
					<input type="number" className=" w-16" name="margin" value={0} id="margin" />
					<button className=" text-center w-full">Left</button>
				</div>
				<div>
					<input type="number" value={0} className=" w-16" name="margin" id="margin" />
					<button className=" text-center w-full">Right</button>
				</div>
				<div>
					<input type="number" value={0} className=" w-16" name="margin" id="margin" />
					<button className=" text-center w-full">Top</button>
				</div>
				<div>
					<input type="number" value={0} className=" w-16" name="margin" id="margin" />
					<button className=" text-center w-full">Bottom</button>
				</div>
			</div>
		</>
	);
}

export default Padding;
