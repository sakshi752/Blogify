import React from 'react'
import Header from "../Components/Header.jsx"
import Footer from "../Components/Footer.jsx"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children }) => {
    return (
        <>
            <div  className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#0f172a_45%,#020617_100%)] text-white">
                <Header />
                <main className='flex-1 '>
                    <Outlet />
                </main>
                <Footer />
            </div>
            <ToastContainer position='top-right' autoClose={2000} />
        </>
    )
}

export default Layout
