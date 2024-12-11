import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store, persister } from './Redux/store.js';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persister}>
  <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>

)
