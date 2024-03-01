import {useState} from "react";
import {DndContext, useDroppable} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";

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
