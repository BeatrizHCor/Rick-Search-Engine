import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import { LocalStorageContext } from './components/Hooks/useLocalStorage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LocalStorageContext>
            <App />
        </LocalStorageContext>
    </React.StrictMode>
);
