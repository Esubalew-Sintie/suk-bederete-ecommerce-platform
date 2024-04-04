import {
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
} from "react-icons/ai";

import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    header: {
        logo: "Gebeya",
        links: ["Home", "Product", "About", "contact",],
        
    },
    mainContainer: {
        img: "/pro.jpg",
        content: " Lorem, ipsum dolor sit amet consectetur.",
        buttonName:"Add"
       
    },
    footer: {
		logo: "Logo",
		subscriptionTitle: "Stay in the Loop",
		socialMediaIcons: [
			<AiOutlineFacebook size={23} />,
			<AiOutlineInstagram size={23} />,
			<AiOutlineTwitter size={23} />,
		],
		copyRight: "© 2024",
	},    
}

const uiSlice = createSlice({
    name: "ui-builder",
    initialState,
    reducers: {
        editFooterContent: (state,action) => {
            state.footer=action.payload
        },
    }
})
export const {editFooterContent}=uiSlice.actions
export default uiSlice.reducer