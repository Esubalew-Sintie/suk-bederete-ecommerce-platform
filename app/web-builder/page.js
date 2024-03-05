"use client";
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DroppableContainer from "../components/WebBuilder/DroppableContainer";
import RightSidebar from "../components/WebBuilder/RightSidebar";
import LeftSidebar from "../components/WebBuilder/LeftSidebar";
const WebBuilder = () => {
  const [Clickedbutton, setClickedbutton] = useState(null);
  const handleSidebarClick = (clickedbtn) => {
    setClickedbutton(clickedbtn);
  };
  return (
    <>
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-1/4 flex flex-col">
          <RightSidebar Clickedbutton={Clickedbutton} />
        </div>
        {/* Middle Droppable Container */}
        <div className="w-[55%] mx-auto">
          <DroppableContainer />
        </div>
        {/* Right Sidebar */}
        <div className="w-1/4">
          <LeftSidebar handleSidebarClick={handleSidebarClick} />
        </div>
      </div>
    </>
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
