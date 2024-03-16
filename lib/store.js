import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { webBuilder } from './features/webBuilder/webBuilder'
import { products } from './features/products/products'

export const makeStore = () => {
  return configureStore({
      reducer: {
        [webBuilder.reducerPath]: webBuilder.reducer,
        [products.reducerPath]: products.reducer,

      },
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(webBuilder.middleware),
  
  })
}
setupListeners(makeStore().dispatch)


