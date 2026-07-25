import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import { store } from './redux/store'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import BlogPage from './pages/BlogPage/BlogPage.jsx'
import LoginRegisterPage from './pages/LoginAndRegisterPage/LoginRegisterPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage'


const publicRoutes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginRegisterPage />
  },
  {
    path: '/register',
    element: <LoginRegisterPage />
  },
  {
    path: '/blog',
    element: <BlogPage />
  }
]


const protectedRoutes = [
  {
    path: '/profile',
    element: <ProfilePage />
  }
]


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<ErrorPage />}
    >

      {/* Loop through public routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}


      {/* Loop through protected routes */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}

    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </Provider>

)