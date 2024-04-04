import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
    isLogoOpen: false,
    isNavigationOpen: false,
    isExternalLinkOpen: false,
    isPaymentOpen: false,
    isSocilIconsOpen: false,
    isSubscriptionOpen: false,
    isSubscriptionTitleOpen: false,
    isText: false,
    
}
const rightUiBuilder = createSlice({
    name: "rightUiBuilder",
    initialState,
    reducers: {
        socilIconsOpen: (state) => {
            state.isSocilIconsOpen=!state.isSocilIconsOpen
        },
        subscriptionTitleOpen: (state) => { 
            state.isSubscriptionTitleOpen=!state.isSubscriptionTitleOpen
        },
        isText: (state) => {
            state.isText=!state.isText
        },
        subscriptionOpen: (state) => { 
            state.isSubscriptionOpen=!state.isSubscriptionOpen
        },
        open: (state) => {
            state.isOpen=!state.isOpen;
        },
        logoOpen: (state) => { 
            state.isLogoOpen=!state.isLogoOpen;
        },
        navigationOpen:(state) =>{ 
         state.isNavigationOpen=!state.isNavigationOpen;
        },
        externalLinkOpen: () => {
            state.isExternalLinkOpen=!state.isExternalLinkOpen;
        },
        paymentOpen: () => {
            state.isPaymentOpen=!state.isPaymentOpen;
        }
    }

})
export const {open,externalLinkOpen,paymentOpen,isText,logoOpen,navigationOpen,socilIconsOpen,subscriptionOpen,subscriptionTitleOpen} =rightUiBuilder.actions
export default rightUiBuilder.reducer