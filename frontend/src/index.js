import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import StateProvider from './context/Provider';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme  } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SkeletonTheme baseColor="#e9e7e8" highlightColor="#beb8bd">
  <BrowserRouter>
    <StateProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </StateProvider>
  </BrowserRouter> 
  </SkeletonTheme>
);


