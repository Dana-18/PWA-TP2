import { StrictMode } from 'react'
import { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Routes } from '../src/const/routes.js'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import Catalog from './Pages/Catalog/Catalog.jsx'
import CreateRoutine from './Pages/CreateRoutine/CreateRoutine.jsx'
import SelectExercises from './Pages/SelectExercises/SelectExercises.jsx'
import Details from './Pages/Details/Details.jsx';
import FavoritesPage from './Pages/Favorites/Favorites.jsx';
import "./i18n.js";


const router = createBrowserRouter([
  {
    path: Routes.home,
    element: <Home />,
  },
  { path: Routes.catalog, element: <Catalog /> },
  { path: Routes.createRoutine, element: <CreateRoutine /> },
  { path: Routes.selectExercises, element: <SelectExercises /> }, 
  { path: Routes.details, element: <Details /> },
  { path: Routes.favorites, element: <FavoritesPage />},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
