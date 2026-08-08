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
import BlogDetailPage from './pages/BlogPages/BlogDetailPage.jsx'
import LoginRegisterPage from './pages/AuthPage/LoginRegisterPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import BookmarkPage from './pages/BookmarkPage/BookmarkPage.jsx'
import MyBlogsPage from './pages/BlogPages/MyBlogsPage.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import UpdateUserPage from './pages/SettingsPages/UpdateUserPage.jsx'
import DashboardLayout from './Layouts/DashboardLayout.jsx'
import ChangePasswordPage from './pages/SettingsPages/ChangePasswordPage.jsx'
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
    element: <BlogDetailPage />
  }
]


const protectedRoutes = [
  {
    path: '/dashboard',
    element: <HomePage />
  },
  {
    path: '/:username',
    element: <ProfilePage />
  },
  {
    path: '/me/blogs',
    element: <MyBlogsPage />
  },
  {
    path: '/me/bookmarks',
    element: <BookmarkPage />
  },
  {
    path: '/blogs/:id',
    element: <BlogDetailPage />
  },
  {
    path: "/:username/blogs/:id",
    element: <BlogDetailPage />
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