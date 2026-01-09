import { useContext } from 'react'
import SiteButton from '../../../features/buttons/SiteButton'
import ButtonTypes from '../../../features/buttons/types/ButtonTypes'
import type AuctionCartItem from '../model/AuctionCartItem'
import './AuctionCartItemCard.css'
import { AppContext } from '../../../features/app_context/AppContext'
import { Link } from 'react-router-dom'

export default function AuctionActiveCard({ item }: { item: AuctionCartItem }) {
    const { cart, setCart, showToast, active, setActive } = useContext(AppContext)
    const winClick = () => {
        let newCart = { ...cart }
        newCart.items.push({
            item: item.item,
            finalBid: item.finalBid,
            received: false,
            ordered: false
        })
        
        setCart(newCart)
        setActive({ ...active,
                items: active.items.filter(ci => ci.item.id !== item.item.id)
            })
        showToast({message: "Added to won auctions: " + item.item.name})
    }

    return <div className='auction-card-container'>
        <Link to={"/l/" + item.item.slug} className='auction-card-left'>
            <div className='auction-card-img-wrap'><img src={item.item.imageUrl} alt="" /></div>
            <div className='auction-card-text'>
                <h5 className='two-line-ellipsis'>{item.item.name}</h5>
                <h6 className='two-line-ellipsis'>{item.item.description}</h6>
            </div>
        </Link>
        <div className='auction-card-right'>
            {item.received
                ? <div className='auction-card-received'>received</div>
                :
                <div className='auction-card-order active-btn-auc'>
                    <SiteButton text='Win now (showcase)' buttonType={ButtonTypes.Blue} action={winClick}/>
                </div>}
        </div>
    </div>
}