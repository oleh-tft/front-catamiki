import { useContext } from 'react'
import SiteButton from '../../../features/buttons/SiteButton'
import ButtonTypes from '../../../features/buttons/types/ButtonTypes'
import type AuctionCartItem from '../model/AuctionCartItem'
import './AuctionCartItemCard.css'
import { AppContext } from '../../../features/app_context/AppContext'

export default function AuctionCartItemCard({ item }: { item: AuctionCartItem }) {
    const {cart, showModal, clearModal, setCart, showToast} = useContext(AppContext)

    const setOrderState = () => {
        const newCart = {...cart}
        let found = newCart.items.find(i => i.item.id === item.item.id)
        if (found) {
            found.ordered = true
        }
        setCart(newCart)
        showToast({message: 'Awaiting delivery: ' + item.item.name})
        clearModal()
    }

    const setReceivedState = () => {
        const newCart = {...cart}
        let found = newCart.items.find(i => i.item.id === item.item.id)
        if (found) {
            found.received = true
        }
        setCart(newCart)
        showToast({message: 'Confirmed received: ' + item.item.name})
        clearModal()
    }

    const orderClick = () => {
        showModal({
            isCancellable: true,
            title: "New order",
            children: <>
                <div className='new-order-message'>Confirm creation of new order</div>
                <div className='new-order-btns'>
                    <SiteButton text='Confirm' buttonType={ButtonTypes.Blue} action={() => setOrderState()}/>
                    <SiteButton text='Cancel' buttonType={ButtonTypes.White} action={() => clearModal()}/>
                </div>
            </>
        })
    }

    const receiveClick = () => {
        showModal({
            isCancellable: true,
            title: "Confirm delivery",
            children: <>
                <div className='new-order-message'>Confirm delivery of an order</div>
                <div className='new-order-btns'>
                    <SiteButton text='Confirm' buttonType={ButtonTypes.Blue} action={() => setReceivedState()}/>
                    <SiteButton text='Cancel' buttonType={ButtonTypes.White} action={() => clearModal()}/>
                </div>
            </>
        })
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
            {item.received ? <div className='auction-card-received'>received</div>
            :item.ordered ? 
            <div className='auction-card-order'>
                <div className='auction-card-delivery'>awaiting delivery</div>
                <SiteButton text='Confirm received' buttonType={ButtonTypes.Blue} action={receiveClick}/>
            </div>
            :
                <div className='auction-card-order'>
                    <div className='d-flex'>
                        <div className='auction-card-order-block'>
                            <div className='auction-card-final-bid'>YOUR FINAL BID</div>
                            <div className='auction-card-final-value'>$ {item.finalBid}</div>
                        </div>
                        <div className='auction-card-order-block-separator'></div>
                        <div className='auction-card-order-block'>
                            <div className='auction-card-final-bid'>DELIVERY FEE</div>
                            <div className='auction-card-final-value'>$ {item.item.delivery}</div>
                        </div>
                    </div>
                    <SiteButton text='Order' buttonType={ButtonTypes.Blue} action={orderClick}/>
                </div>}
        </div>
    </div>
}