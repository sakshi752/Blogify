import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider, useSelector } from "react-redux"
import { persistor, store } from './redux/store'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import Layout from './Layouts/Layout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import BlogPage from './pages/BlogPages/BlogPage.jsx'
import LoginRegisterPage from './pages/LoginAndRegisterPage/LoginRegisterPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { PersistGate } from 'redux-persist/integration/react'
import UpdateUserPage from './pages/UpdateUserPage/UpdateUserPage.jsx'
import DashboardLayout from './Layouts/DashboardLayout.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage.jsx'
import BlogEditorPage from './pages/BlogPages/BlogEditorPage.jsx'
import ProtectedRoute from './Layouts/ProtectedRoute.jsx'


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
    path: '/dashboard',
    element: <HomePage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/blogs/:id',
    element: <BlogPage />
  },
  {
    path: "/:userId/blogs/:id",
    element: <BlogPage />
  },
  {
    path: '/settings/update-user',
    element: <UpdateUserPage />
  },
  {
    path: '/settings/update-password',
    element: <ChangePasswordPage />
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



      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
        <Route path='/add-blog' element={<BlogEditorPage />} />
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </PersistGate>
  </Provider>

)