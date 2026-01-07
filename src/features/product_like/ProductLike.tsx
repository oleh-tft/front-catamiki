import { useContext } from 'react'
import type { ProductType } from '../../entities/product/model/ProductType'
import './ui/ProductLike.css'
import { AppContext } from '../app_context/AppContext'

export default function ProductLike({likes, product}: {likes: number, product: ProductType}) {
    const {user, showToast} = useContext(AppContext)

    const likeClick = () => {
        if (!user) {
            showToast({message: "You must be logged in to perform this action"})
        } else {
            showToast({message: `Added auction for '${product.name}' to favorites!`})
        }
    }

    return <div className='product-like-wrap' onClick={likeClick} role='button'>
        <i className="bi bi-heart icon-blue"></i>
        <div>{likes}</div>
    </div>
}