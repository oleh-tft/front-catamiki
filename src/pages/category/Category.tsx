import "./ui/Category.css"
import ProductCard from "../../entities/product/ui/ProductCard"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import type { CategoryType } from "../../entities/category/model/CategoryType"
import CategoryDao from "../../entities/category/api/CategoryDao"
import NotFound from "../not_found/NotFound"
import { AppContext } from "../../features/app_context/AppContext"

export default function Category() {
    const { setBusy } = useContext(AppContext)
    const { slug } = useParams()
    const [pageData, setPageData] = useState<CategoryType | null>(null)

    useEffect(() => {
        setBusy(true)
        console.log(slug)
        if (typeof (slug) != 'undefined') {
            if (slug === 'for-you' || slug === 'trending') {
                CategoryDao.getCategory('art')
                    .then(setPageData)
                    .catch(() => setPageData(null))
                    .finally(() => setBusy(false))
            } else {
                CategoryDao.getCategory(slug)
                    .then(setPageData)
                    .catch(() => setPageData(null))
                    .finally(() => setBusy(false))
            }
        }
    }, [slug])

    return <>
        {!pageData ? <NotFound />
            : <div className="products-container mt-5">
                {pageData?.products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>}
    </>

}