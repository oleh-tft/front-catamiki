import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserDao from "../../entities/user/api/UserDao"
import { AppContext } from "../app_context/AppContext"
import SiteButton from "../buttons/SiteButton"
import ButtonTypes from "../buttons/types/ButtonTypes"

export default function SignInButton({ registered }: { registered: boolean }) {
    const { showModal } = useContext(AppContext)

    return <SiteButton text={`${registered ? 'Sign In' : 'Register'}`} buttonType={ButtonTypes.Blue} maxWidth='6.5em'
        action={() => showModal({
            title: "Sign in or create an account",
            isCancellable: true,
            children: <AuthForm registered={registered} />
        })} />
}

function AuthForm({ registered }: { registered: boolean }) {
    const { showToast, setBusy, setUser, clearModal } = useContext(AppContext)
    const [isRegistered, setRegistered] = useState<boolean>(registered)

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
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

    const onRegisterClick = () => {
    }

    return (isRegistered 
    ? <div className='modal-sign'>
        <div className='fc-between'>
            <div className='sign-in-title'>Welcome back!</div>
            <div className='text-blue sign-in-action' role='button' onClick={() => setRegistered(false)}>Create account</div>
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
    : <div className='modal-sign'>
        <div className='fc-between'>
            <div className='sign-in-title'>Create account</div>
            <div className='text-blue sign-in-action' role='button' onClick={() => setRegistered(true)}>Sign in</div>
        </div>
        <div className="register-name-row mb-2">
            <div className="form-floating mt-3">
                <input type="text" name="name" id="name" className="form-control" placeholder='First name' value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="name">First name</label>
            </div>
            <div className="form-floating mt-3">
                <input type="text" name="surname" id="surname" className="form-control" placeholder='Last name' value={surname} onChange={e => setSurname(e.target.value)} />
                <label htmlFor="surname">Last name</label>
            </div>
        </div>
        <div className="form-floating mb-2 ">
            <input type="email" name="email-in" id="email-in" className="form-control" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email-in">Email address</label>
        </div>
        <div className="form-floating mb-1">
            <input type="password" name="password-in" id="password-in" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password-in">Password</label>
        </div>
        <div className="sign-in-agree register-valid">At least 8 characters, one capital letter, one lower case letter, one number and one special character</div>
        <div className='sign-in-agree mb-3'>By creating an account, you agree to our <span className='text-blue' role='button'>Terms of Use</span> and acknowledge our Privacy Policy. Depending on how you use Catamiki, we may send you promotional emails. See our Privacy Policy for more info or to opt-out.</div>
        <SiteButton text='Agree and continue' buttonType={ButtonTypes.Blue} action={onRegisterClick} />
    </div>)
}