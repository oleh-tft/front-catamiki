import { Link, Outlet } from 'react-router-dom'
import './ui/Layout.css'
import SiteButton from '../buttons/SiteButton'
import ButtonTypes from '../buttons/types/ButtonTypes'
import { useContext, useEffect, useState } from 'react'
import CategoryPopup from '../../entities/category/ui/CategoryPopup'
import CategorySlider from '../../entities/category/ui/CategorySlider'
import { AppContext } from '../app_context/AppContext'
import UserDao from '../../entities/user/api/UserDao'
import Footer from '../footer/Footer'

export default function Layout() {
    const { showModal, user, setUser, showToast } = useContext(AppContext)

    const exitAuth = () => {
        window.localStorage.removeItem("cm-user")
        setUser(null)
        showToast({message: 'You have logged out'})
    }

    return <>
        <header className='container px-4'>
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
                                    <SiteButton text='Profile' buttonType={ButtonTypes.Blue}/>
                                    <div className='profile-sign-out mt-4' role='button' onClick={exitAuth}>Sign out</div>
                                </div>
                            </div>
                            : <SiteButton text="Sign In" buttonType={ButtonTypes.Blue} maxWidth='6.5em'
                                action={() => showModal({
                                    title: "Sign in or create an account",
                                    isCancellable: true,
                                    children: <AuthForm />
                                })} />
                        }
                    </div>
                </div>
            </nav>
            <CategorySlider />
        </header>
        <main className='container px-4'><Outlet /></main>
        <Footer />
    </>
}

function AuthForm() {
    const { showToast, setBusy, setUser, clearModal } = useContext(AppContext)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isFormValid, setFormValid] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)

    useEffect(() => {
        setFormValid(email.length > 2 && password.length > 2)
    }, [email, password])

    const onAuthClick = () => {
        setBusy(true)
        UserDao
            .authenticate(email, password)
            .then(res => {
                if (res == null) {
                    showToast({
                        message: "Access denied",
                        timeout: 8000
                    })
                } else {
                    if (remember) {
                        window.localStorage.setItem("cm-user", JSON.stringify(res))
                    }
                    setUser(res)
                    showToast({
                        message: "Logged in successfully",
                        timeout: 5000
                    })
                    clearModal()
                }
            })
            .finally(() => {
                setBusy(false)
            })
    }

    return <div className='modal-sign'>
        <div className='fc-between'>
            <div className='sign-in-title'>Welcome back!</div>
            <div className='text-blue sign-in-action' role='button'>Create account</div>
        </div>
        <div className="form-floating mb-2 mt-3">
            <input type="email" name="email-in" id="email-in" className="form-control" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email-in">Email address</label>
        </div>
        <div className="form-floating mb-1">
            <input type="password" name="password-in" id="password-in" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password-in">Password</label>
        </div>
        <div className='fc-between'>
            <label className='p-3'>
                <input type="checkbox" name="remember-in" id="remember-in" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span className='ms-2 sign-in-remember'>Remember me</span>
            </label>
            <Link to="/" className='text-blue sign-in-action' role='button'>Forgotten your password?</Link>
        </div>
        <div className='sign-in-agree mb-3'>By signing in, you agree to our <span className='text-blue' role='button'>Terms of Use</span></div>
        <SiteButton text='Sign in' buttonType={ButtonTypes.Blue} action={onAuthClick} />
    </div>
}