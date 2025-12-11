import { Link } from 'react-router-dom'
import type { ProductType } from '../model/ProductType'
import './ProductCard.css'
import ProductLike from '../../../features/product_like/ProductLike'

export default function ProductCard({ product }: { product: ProductType }) {
    return <div className="product-card">
        <Link to={"/product/" + (product.slug ?? product.id)}>
            {product.likes && product.likes > 0 &&
                <div className="product-card-likes">
                    <ProductLike likes={product.likes} />
                </div>}

            <div className="product-card-imgs"><img src={product.imageUrl} alt={product.name} /></div>
            <div className='product-name'>{product.name}</div>
            <div className='product-currentbid'>CURRENT BID</div>
            <div className="product-card-bid">${product.bid}</div>
            <div className='product-timeleft'>{product.timeleft} left</div>
            
        </Link>
    </div>
}