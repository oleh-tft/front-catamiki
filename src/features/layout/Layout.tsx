import { Outlet } from 'react-router-dom'
import './ui/Layout.css'
import Footer from '../footer/Footer'
import Header from '../header/Header'

export default function Layout() {
    return <>
        <Header />
        <main className='container px-4'><Outlet /></main>
        <Footer />
    </>
}