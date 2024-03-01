import { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Backdrop from "./backdrop";

<<<<<<< HEAD
const DroppableContainer = () => {
	

	

	return (
		<div
			className=" w-full h-full bg-white"
		>
			<h2>Droppable Container</h2>
			<div className=" flex flex-col gap-5">
				
			</div>
		</div>
	);
=======
const DroppableContainer = ({ containerItem }, { children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "droppable",
    data: {
      dr: containerItem,
    },
  });

  const containerStyle = {
    backgroundColor: isOver ? "lightgray" : "white",
    minHeight: "200px",
    padding: "16px",
  };
  const onDragEnd = (e) => {
    console.log(e);
  };

  const [isMobileView, setMobileView] = useState(false);
  function toggleView(view) {
    console.log("button clicked");
    if (view === "mobile" && !isMobileView) {
      setMobileView(true);
    } else if (view === "desktop" && isMobileView) {
      setMobileView(false);
    }
  }

  return (
    // <div
    //   ref={setNodeRef}
    //   style={containerStyle}
    //   className=" w-full h-full bg-white"
    // >
    //   <h2>Droppable Container</h2>
    //   <div className=" flex flex-col gap-5">
    //     {containerItem.map((item) => (
    //       <button key={item.id} className=" bg-black mt-2 text-white">
    //         {item}hello
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className="text-gray-800 text-lg bg-slate-100 w-full mx-auto min-h-full">
      <div className="flex pl-4 mb-5 py-2 px-5">
        <button
          type="button"
          className="ml-4 "
          onClick={() => toggleView("desktop")}
        >
          Desktop view
          <span></span>
        </button>
        <button className="mx-4 " onClick={() => toggleView("mobile")}>
          Mobile view
        </button>
        <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase rounded shadow hover:shadow-lg ml-auto py-2 px-2 ease-linear transition-all duration-150">
          Preview
        </button>
        <button className="bg-blueGray-800 text-white hover:bg-blue-200  text-sm font-bold uppercase py-2 px-2 rounded shadow hover:shadow-lg ml-auto">
          Publish
        </button>
      </div>

      <div className="shadow-md flex justify-center mx-auto  w-full min-h-[90vh] relative bg-neutral-200 rounded-lg">
        desk top view
        {children}
        {isMobileView && <Backdrop />}
        {isMobileView && (
          <div className=" flex break-words w-80 bg-gray-100 z-10 rounded-2xl text-center h-full absolute left-1/2 transform -translate-x-1/2  overflow-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
>>>>>>> main
};
export default DroppableContainer;

// import { useDroppable } from "@dnd-kit/core";

// const CartDroppable = (props) => {
//   const { setNodeRef } = useDroppable({
//     id: "cart-droppable"
//   });

//   return (
//     <ul className='cart' ref={setNodeRef}>
//       {props.items.map((item, idx) => (
//         <div key={`${item}-${idx}`} className="cart-item">
//           {item}
//         </div>
//       ))}
//     </ul>
//   );
// };

// export default CartDroppable;
