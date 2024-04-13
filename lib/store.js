import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { webBuilder } from './features/webBuilder/webBuilder'
import { products } from './features/products/products'
import { authSlice } from './features/auth/authMerchant'
import { shopSlice } from './features/shop/shop'
export const makeStore = () => {
  return configureStore({
      reducer: {
        [webBuilder.reducerPath]: webBuilder.reducer,
        [products.reducerPath]: products.reducer,
        [authSlice.reducerPath]: authSlice.reducer,
        [shopSlice.reducerPath]: shopSlice.reducer,

      },
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(webBuilder.middleware).concat(products.middleware).concat(authSlice.middleware).concat(shopSlice.middleware),
  
  })
}
setupListeners(makeStore().dispatch)


