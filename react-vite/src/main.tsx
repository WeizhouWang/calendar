import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from './pages/calendar/calendar.tsx'
import './main.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app.tsx';
import Sites from './pages/sites/sites.tsx';
import ErrorPage from './error-page.tsx';
import Contact from './contact.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      { path: 'calendar', element: <Calendar></Calendar> },
      { path: 'sites', element: <Sites></Sites> },
    ]
  },
  {
    path: "contacts",
    element: <Contact />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
