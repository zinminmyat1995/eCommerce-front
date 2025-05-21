import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import GlobalContext from "./components/GlobalContext/GlobalContext";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <GlobalContext>
      <App />
    </GlobalContext>
  </Provider>,
)
