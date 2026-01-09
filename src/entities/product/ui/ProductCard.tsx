import { Link } from 'react-router-dom'
import type { ProductType } from '../model/ProductType'
import './ProductCard.css'
import ProductLike from '../../../features/product_like/ProductLike'
import Helper from '../../../app/Helper'

export default function ProductCard({ product }: { product: ProductType }) {
    return <div className="product-card">
        {product.likes && product.likes > 0 && <ProductLike likes={product.likes} product={product} />}
        <Link to={"/l/" + (product.slug ?? product.id)}>


            <div className="product-card-imgs"><img src={product.imageUrl} alt={product.name} /></div>
            <div className='product-name two-line-ellipsis'>{product.name}</div>
            <div className='product-currentbid'>CURRENT BID</div>
            <div className="product-card-bid">${product.bid}</div>
            <div className='product-timeleft' style={{color: Helper.getSecondsRemaining(product) > 3600 ? '#919397' : '#0033FF'}}>{Helper.getSecondsRemaining(product).toTimeRemaining()}</div>

        </Link>
    </div>
}