import { useState } from "react";
import Style from "./RightSidbar.module.css";
import EditImage from "./EditImage";
import EditText from "./EditText";
function RightSidebar() {
    const [isText,setText]=useState(false)
	return (
		<div className={Style.container}>
            {
                isText ?(<EditText /> ):(<EditImage />)
            }
		</div>
	);
}

export default RightSidebar;
