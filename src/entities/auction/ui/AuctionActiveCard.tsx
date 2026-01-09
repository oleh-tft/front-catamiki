import { useContext } from 'react'
import SiteButton from '../../../features/buttons/SiteButton'
import ButtonTypes from '../../../features/buttons/types/ButtonTypes'
import type AuctionCartItem from '../model/AuctionCartItem'
import './AuctionCartItemCard.css'
import { AppContext } from '../../../features/app_context/AppContext'

export default function AuctionActiveCard({ item }: { item: AuctionCartItem }) {
    const { cart, setCart, showToast } = useContext(AppContext)
    const winClick = () => {
        let newCart = { ...cart }
        newCart.items.push({
            item: item.item,
            finalBid: item.finalBid,
            received: false
        })
        setCart(newCart)
        showToast({message: "Added to won auctions: " + item.item.name})
    }

    return <div className='auction-card-container'>
        <div className='auction-card-left'>
            <div className='auction-card-img-wrap'><img src={item.item.imageUrl} alt="" /></div>
            <div className='auction-card-text'>
                <h5 className='two-line-ellipsis'>{item.item.name}</h5>
                <h6 className='two-line-ellipsis'>{item.item.description}</h6>
            </div>
        </div>
        <div className='auction-card-right'>
            {item.received
                ? <div className='auction-card-received'>received</div>
                :
                <div className='auction-card-order'>
                    <SiteButton text='Win now (showcase)' buttonType={ButtonTypes.Blue} action={winClick}/>
                </div>}
        </div>
    </div>
}