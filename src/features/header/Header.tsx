import { Link, useNavigate } from "react-router-dom";
import CategoryPopup from "../../entities/category/ui/CategoryPopup";
import CategorySlider from "../../entities/category/ui/CategorySlider";
import SiteButton from "../buttons/SiteButton";
import ButtonTypes from "../buttons/types/ButtonTypes";
import SignInButton from "../modals/SignInButton";
import { useContext } from "react";
import { AppContext } from "../app_context/AppContext";
import './ui/Header.css'


export default function Header() {
    const { user, setUser, showToast } = useContext(AppContext)
    const navigate = useNavigate();

    const exitAuth = () => {
        window.localStorage.removeItem("cm-user")
        setUser(null)
        showToast({ message: 'You have logged out' })
        navigate('/')
    }

    return <header className='container px-4'>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand icon-blue-hoverable"><h2>catamiki</h2></Link>
                <CategoryPopup />
                <div className="collapse navbar-collapse mx-4" id="navbarScroll">
                    <form className="d-flex flex-grow-1" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search for brand, model, artist..." aria-label="Search" />
                    </form>
                </div>
                <div className='navbar-right-wrap'>
                    <Link to="/"><span className="nav-text-interactable">{user ? 'Sell' : 'How it works?'}</span></Link>
                    <Link to="/"><span className="nav-text-interactable">Help</span></Link>
                    <Link to="/"><i className="bi bi-heart icon-blue-hoverable"></i></Link>
                    <Link to="/"><i className="bi bi-globe icon-blue-hoverable"></i> EN</Link>
                    {user
                        ? <div className='sign-in-profile'>
                            <div role='button'>
                                <i className="bi bi-person icon-blue"></i>
                                <span className='mx-1'>{user.name}</span>
                                <i className="bi bi-chevron-compact-down icon-blue"></i>
                            </div>
                            <div className='profile-hover'>
                                <SiteButton text='Profile' buttonType={ButtonTypes.Blue} action={() => navigate("/profile")} />
                                <div className='profile-sign-out mt-4' role='button' onClick={exitAuth}>Sign out</div>
                            </div>
                        </div>
                        : <SignInButton registered={true} />
                    }
                </div>
            </div>
        </nav>
        <CategorySlider />
    </header>
}