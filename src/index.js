import React from 'react';
import ReactDOM from 'react-dom/client';

//import reportWebVitals from "./reportWebVitals";

import  { ContextProvider } from './contexts/ContextProvider'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

<React.StrictMode>
   <ContextProvider>
    <App />
    </ContextProvider>
</React.StrictMode>

)
