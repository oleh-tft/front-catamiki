import { useContext, useState } from 'react'
import './ui/Profile.css'
import { AppContext } from '../../features/app_context/AppContext'
import AuctionCartItemCard from '../../entities/auction/ui/AuctionCartItemCard'
import AuctionActiveCard from '../../entities/auction/ui/AuctionActiveCard'
import SiteButton from '../../features/buttons/SiteButton'
import ButtonTypes from '../../features/buttons/types/ButtonTypes'

export default function Profile() {
    const { user } = useContext(AppContext)
    const [pageType, setPageType] = useState<Page>(Page.Won)

    return (user ? <div className='profile-container'>
        <h1>Hello {user?.name}</h1>
        <div className='profile-line'></div>
        <div className='profile-content'>
            <div className='profile-left'>
                <div className='profile-page' onClick={() => setPageType(Page.Won)}>Won auctions</div>
                <div className='profile-page' onClick={() => setPageType(Page.Active)}>Active auctions</div>
                <div className='profile-page' onClick={() => setPageType(Page.Account)}>Account</div>
            </div>
            <div className='profile-right'>
                {pageType === Page.Won ? <Won />
                    : pageType === Page.Active ? <Active />
                        : <Account />}
            </div>
        </div>
    </div>
    : <div className='page-not-found'>You must be logged in to access this page</div>)
}

enum Page {
    Won,
    Active,
    Account
}

function Won() {
    const { cart } = useContext(AppContext)

    return <>
        {cart.items.length > 0 ?
            <>
                <h5 className='profile-title'>Won</h5>
                <div className='profile-line-light'></div>
                <div className='profile-won-auctions'>
                    {cart.items.map(auc => <AuctionCartItemCard item={auc} />)}
                </div>
            </>
            : <><h5 className='text-center'>You did not win anything yet</h5></>}
    </>
}

function Active() {
    const { active } = useContext(AppContext)

    return <>
        {active.items.length > 0 ?
            <>
                <h5 className='profile-title'>Active</h5>
                <div className='profile-line-light'></div>
                <div className='profile-won-auctions'>
                    {active.items.map(auc => <AuctionActiveCard item={auc} />)}
                </div>
            </>
            : <h5 className='text-center'>You don't have active auctions</h5>
        }
    </>
}

function Account() {
    const { user, setUser, showToast } = useContext(AppContext)
    const [name, setName] = useState<string>((user?.name) ?? "")
    const [surname, setSurname] = useState<string>((user?.surname) ?? "")
    const [email, setEmail] = useState<string>((user?.email) ?? "")
    const [password, setPassword] = useState<string>((user?.password) ?? "")
    const [phone, setPhone] = useState<string>((user?.phone) ?? "")
    const [country, setCountry] = useState<string>((user?.address.country) ?? "")
    const [street, setStreet] = useState<string>((user?.address.street) ?? "")
    const [house, setHouse] = useState<string>((user?.address.house) ?? "")
    const [postal, setPostal] = useState<string>((user?.address.postal) ?? "")
    const [city, setCity] = useState<string>((user?.address.city) ?? "")

    const saveUser = () => {
        if (!user) return
        const newUser = { ...user }
        newUser.name = name
        newUser.surname = surname
        newUser.email = email
        newUser.password = password
        newUser.phone = phone
        if (newUser.address) {
            newUser.address.country = country
            newUser.address.street = street
            newUser.address.house = house
            newUser.address.postal = postal
            newUser.address.city = city
        }
        setUser(newUser)
        window.localStorage.setItem("cm-user", JSON.stringify(newUser))
        showToast({ message: "User settings were updated" })
    }

    return <>
        <h5 className='profile-title'>Account</h5>
        <div className='profile-line-light'></div>
        <div className='profile-account-block'>
            <div className='profile-block-flex'>
                <h6>Name</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="name" id="name" className="form-control" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor="name">Name</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Surname</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="surname" id="surname" className="form-control" placeholder='Surname' value={surname} onChange={e => setSurname(e.target.value)} />
                    <label htmlFor="surname">Surname</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Username</h6>
                <input type="text" name="username" id="username" readOnly={true} className="form-control form-username-read" value={user?.username} />
                <div className="form-username">You can't edit your username.</div>
            </div>
            <div className='profile-block-flex'>
                <h6>Email</h6>
                <div className="form-floating mb-2">
                    <input type="email" name="email" id="email" className="form-control" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Password</h6>
                <div className="form-floating mb-2">
                    <input type="password" name="password" id="password" className="form-control" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Phone</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="phone" id="phone" className="form-control" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
                    <label htmlFor="phone">Phone</label>
                </div>
            </div>
            <br />
            <div className='profile-block-flex'>
                <h6>Country</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="country" id="country" className="form-control" placeholder='Country' value={country} onChange={e => setCountry(e.target.value)} />
                    <label htmlFor="country">Country</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Street</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="street" id="street" className="form-control" placeholder='Street' value={street} onChange={e => setStreet(e.target.value)} />
                    <label htmlFor="street">Street</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>House</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="house" id="house" className="form-control" placeholder='House' value={house} onChange={e => setHouse(e.target.value)} />
                    <label htmlFor="house">House</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>Postal</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="postal" id="postal" className="form-control" placeholder='Postal' value={postal} onChange={e => setPostal(e.target.value)} />
                    <label htmlFor="postal">Postal</label>
                </div>
            </div>
            <div className='profile-block-flex'>
                <h6>City</h6>
                <div className="form-floating mb-2">
                    <input type="text" name="city" id="city" className="form-control" placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
                    <label htmlFor="city">City</label>
                </div>
            </div>
        </div>
        <div className='profile-block-btn'><SiteButton text='Save' buttonType={ButtonTypes.Blue} action={saveUser} maxWidth='200px'/></div>
    </>
}