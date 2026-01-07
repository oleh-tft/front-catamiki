import "./ui/Category.css"
import ProductCard from "../../entities/product/ui/ProductCard"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { CategoryType } from "../../entities/category/model/CategoryType"
import CategoryDao from "../../entities/category/api/CategoryDao"
import NotFound from "../not_found/NotFound"

export default function Category() {
    const { slug } = useParams()
    const [pageData, setPageData] = useState<CategoryType | null>(null)

    useEffect(() => {
        if (typeof (slug) != 'undefined') {
            CategoryDao.getCategory(slug)
                .then(setPageData)
                .catch(() => setPageData(null))
        }
    }, [slug])

    return <>
        {!pageData ? <NotFound/>
            : <div className="products-container mt-5">
                {pageData?.products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>}
    </>

}