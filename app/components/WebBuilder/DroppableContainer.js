import {useState} from "react";
import {DndContext, useDroppable} from "@dnd-kit/core";
import {SortableContext} from "@dnd-kit/sortable";

const DroppableContainer = ({containerItem}) => {
	const {setNodeRef, isOver} = useDroppable({
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

	return (
		<div
			ref={setNodeRef}
			style={containerStyle}
			className=" w-full h-full bg-white"
		>
			<h2>Droppable Container</h2>
			<div className=" flex flex-col gap-5">
				{containerItem.map((item) => (
					<button key={item.id} className=" bg-black mt-2 text-white">{item}</button>
				))}
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
