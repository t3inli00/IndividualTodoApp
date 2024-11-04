import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.js';
import UserProvider from './context/UserProvider.js';
import './index.css';
import Authentication, { AuthenticationMode } from './screens/Authentication.js';
import ErrorPage from './screens/ErrorPage.js';
import Home from './screens/Home.js';


const router = createBrowserRouter([
    {
        errorElement:<ErrorPage />
    },
    {
        path: "/signin",
        element:<Authentication AuthenticationMode ={AuthenticationMode.Login} />
    },
    {
        path: "/signup",
        element:<Authentication AuthenticationMode ={AuthenticationMode.Register} />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={ router } />
        </UserProvider>
    </React.StrictMode>
)