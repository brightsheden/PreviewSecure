import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from 'react-query';
import { Provider } from 'react-redux'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './screens/RegisterScreen.jsx';
import SignIn from './screens/LoginScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

import store from './state/store.js';
import AddImageLinkScreen from './screens/AddImageLinkScreen.jsx';
import ImageViewDetails from './screens/ImageViewDetails.jsx'
import EditImageLinkScreen from './screens/EditImageScreen.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },

  {

    path: "/register",
    element: <Register/>

  },

  
  {

    path: "/login",
    element: <SignIn/>

  },

  {

    path: "/profile",
    element: <ProfileScreen/>

  },

  {

    path: "/media/:id",
    element: <ImageViewDetails/>

  },

  {

    path: "/editimage/:id",
    element: <EditImageLinkScreen/>

  },

  {

    path: "/addimagelink",
    element: <AddImageLinkScreen/>

  },


]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>

    </Provider>
   
  </React.StrictMode>,
)