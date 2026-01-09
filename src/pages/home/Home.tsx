import ProductCard from '../../entities/product/ui/ProductCard'
import './ui/Home.css'
import AllProducts from '../../app/AllProducts'

export default function Home() {
    return <div className="products-container mt-5">
        {AllProducts?.products.map(product => <ProductCard product={product} key={product.id} />)}
    </div>
}