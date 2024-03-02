import { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Backdrop from "./backdrop";
import NavBar from "./NavBar";

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
      <NavBar onButtonClick={toggleView} />
      <div className="shadow-md flex justify-center mx-auto  w-full min-h-[90vh] relative bg-neutral-200 rounded-lg">
        desk top view
        {children}
        {isMobileView && <Backdrop />}
        {isMobileView && (
          <div className=" flex break-words w-80 bg-gray-100 z-10 rounded-2xl text-center h-full absolute">
            {children}
          </div>
        )}
      </div>
    </div>
  );
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
