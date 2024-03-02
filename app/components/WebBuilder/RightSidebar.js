import { useState } from "react";
import Style from "./RightSidbar.module.css";
import EditImage from "./EditImage";
import EditText from "./EditText";
import Footer from "./Footer/Footer";
function RightSidebar() {
  const [isText, setText] = useState(true);
  return (
    <div className={Style.container}>
      {/* {isText ? <EditText /> : <EditImage />} */}
      <Footer />
    </div>
  );
}
export default RightSidebar
