import { Link, Outlet } from 'react-router-dom'
import './ui/Layout.css'
import SiteButton from '../buttons/SiteButton'
import ButtonTypes from '../buttons/types/ButtonTypes'

export default function Layout() {
    return <>
        <header className='container px-4'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><h2>catamiki</h2></Link>
                    <div className="nav-text-interactable" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <span className='px-1'>Categories</span>
                        <i className="bi bi-chevron-compact-down icon-blue"></i>
                    </div>
                    <div className="collapse navbar-collapse mx-4" id="navbarScroll">
                        <form className="d-flex flex-grow-1" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search for brand, model, artist..." aria-label="Search" />
                        </form>
                    </div>
                    <div className='navbar-right-wrap'>
                        <Link to="/"><span className="nav-text-interactable">How it works?</span></Link>
                        <Link to="/"><span className="nav-text-interactable">Help</span></Link>
                        <Link to="/"><i className="bi bi-heart icon-blue"></i></Link>
                        <Link to="/"><i className="bi bi-globe icon-blue"></i> EN</Link>
                        <SiteButton text="Sign In" buttonType={ButtonTypes.Blue} />
                    </div>
                </div>
            </nav>
        </header>
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <main className='container px-4'><Outlet /></main>
        <footer className='container px-4'>
            <Link to="/privacy">Data Protection & Privacy Notice</Link>
            &copy; 2025
        </footer>
    </>
}