"use client";
import {useState} from "react";
import {DndContext} from "@dnd-kit/core";
import DraggableItem from "../components/WebBuilder/DraggableItem";
import DroppableContainer from "../components/WebBuilder/DroppableContainer";
import LeftSidebar from "../components/WebBuilder/LeftSidebar";
import RightSidebar from "../components/WebBuilder/RightSidebar";
const WebBuilder = () => {
	const [draggableElement, setDraggrableElement] = useState([
		"button",
		"Image",
		"Card",
		"TextField",
	]);
	const [containerItem, setContainerItem] = useState(["button"]);
	const addToContiner = (e) => {
		// console.log(e.active);
		const newItem = e.active.data?.current?.dr;
		if (e.over?.id !== "droppable" || !newItem) return;
		const temp = [...containerItem];
		temp.push(newItem);
		setContainerItem(temp);
	};
	return (
		<DndContext onDragEnd={addToContiner}>
			<div className=" flex w-screen bg-black h-full ">
				<div className="w-1/4 flex gap-5 flex-col   ">
					{draggableElement.map((dr) => (
						<LeftSidebar key={dr} dr={dr} />
					))}
				</div>
				<div className=" w-full ">
					<DroppableContainer setContainerItem={setContainerItem} containerItem={containerItem} />
				</div>
				<div className=" w-1/4 justify-end ">
          <RightSidebar />
           
				</div>
			</div>
		</DndContext>
	);
};

export default WebBuilder;

// 'use client'
// import { DndContext } from "@dnd-kit/core";
// import { useState } from "react";
// import CartDroppable from "../components/WebBuilder/DroppableContainer";
// import FruitDraggable from "../components/WebBuilder/LeftSidebar";

// const App = () => {
//   const fruits = ["Apple", "Banana", "Lemon", "Pear", "Mango"];
//   const [cartItems, setCartItems] = useState(['test']);

// 	const addItemsToCart = (e) => {
// 	  console.log('fuiyfuo');
//     const newItem = e.active.data.current?.title;
//     if (e.over?.id !== "cart-droppable" || !newItem) return;
//     const temp = [...cartItems];
//     temp.push(newItem);
//     setCartItems(temp);
//   };

//   return (
//     <DndContext onDragEnd={addItemsToCart}>
//       <main className='main'>
//         <div className='fruit-list-section'>
//           <h1>Fruit List</h1>
//           <ul className='fruit-list'>
//             {fruits.map((fruit) => (
//               <FruitDraggable key={fruit}>{fruit}</FruitDraggable>
//             ))}
//           </ul>
//         </div>
//         <div className="cart-section">
//           <h1>My Cart</h1>
//           <CartDroppable items={cartItems} />
//         </div>
//       </main>
//     </DndContext>
//   );
// };

// export default App;
