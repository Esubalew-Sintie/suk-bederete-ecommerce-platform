import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import merchantSlice from "./features/auth/merchantSlice";
import status from "./features/uiBuilder/status";
import {webBuilder} from "./features/webBuilder/webBuilder";
import {productsApi} from "./features/products/products";
import {authSlice} from "./features/auth/authMerchant";
import {shopSlice} from "./features/shop/shop";
import editorReducer from "./features/editor";
export const makeStore = () => {
	return configureStore({
		reducer: {
			[webBuilder.reducerPath]: webBuilder.reducer,
			[productsApi.reducerPath]: productsApi.reducer,
			[authSlice.reducerPath]: authSlice.reducer,
			[shopSlice.reducerPath]: shopSlice.reducer,
			merchant: merchantSlice,
			status: status,
			editor: editorReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(webBuilder.middleware)
				.concat(productsApi.middleware)
				.concat(authSlice.middleware)
				.concat(shopSlice.middleware),
	});
};
setupListeners(makeStore().dispatch);
