import { Link } from 'react-router-dom'
import './ui/Footer.css'
import { useContext } from 'react'
import { AppContext } from '../app_context/AppContext'

export default function Footer() {
    const { user } = useContext(AppContext)

    return <footer className='footer-main'>
        <div className='footer-line'>
            <div className='footer-container footer-map'>
                <div className='footer-flex-1'>
                    <h6>About Catamiki</h6>
                    <ul>
                        <li><Link to="/privacy">About Catamiki</Link></li>
                        <li><Link to="/privacy">Our experts</Link></li>
                        <li><Link to="/privacy">Careers</Link></li>
                        <li><Link to="/privacy">Press</Link></li>
                        <li><Link to="/privacy">Partnering with Catamiki</Link></li>
                        <li><Link to="/privacy">Collectors' portal</Link></li>
                    </ul>
                </div>
                <div className='footer-flex-1'>
                    <h6>Buy</h6>
                    <ul>
                        <li><Link to="/privacy">How to buy</Link></li>
                        <li><Link to="/privacy">Buyer Protection</Link></li>
                        <li><Link to="/privacy">Catamiki Stories</Link></li>
                        <li><Link to="/privacy">Buyer terms</Link></li>
                    </ul>
                </div>
                <div className='footer-flex-1'>
                    <h6>Sell</h6>
                    <ul>
                        <li><Link to="/privacy">How to sell</Link></li>
                        <li><Link to="/privacy">Seller Tips</Link></li>
                        <li><Link to="/privacy">Submission guidelines</Link></li>
                        <li><Link to="/privacy">Seller terms</Link></li>
                        <li><Link to="/privacy">Affiliates</Link></li>
                    </ul>
                </div>
                <div className='footer-flex-1'>
                    <h6>My Catamiki</h6>
                    {!user
                        ? <ul>
                            <li><Link to="/privacy">Sign in</Link></li>
                            <li><Link to="/privacy">Register</Link></li>
                            <li><Link to="/privacy">Help Centre</Link></li>
                        </ul>
                        : <ul>
                            <li><Link to="/privacy">Help Centre</Link></li>
                            <li><Link to="/privacy">Settings</Link></li>
                            <li><Link to="/privacy">My favoriute lots</Link></li>
                            <li><Link to="/privacy">My saved searches</Link></li>
                        </ul>
                    }
                </div>
            </div>
        </div>
        <div className='footer-container footer-lower fc-between'>
            <Link to="/privacy">Terms of Use</Link>
            <Link to="/privacy">Data Protection & Privacy Notice</Link>
            <Link to="/privacy">Cookie Policy</Link>
            <Link to="/privacy">Law Enforcement Policy</Link>
            <Link to="/privacy">Other Policies</Link>
            <div className='footer-copyright'>&copy; 2026</div>
        </div>
    </footer>
}