import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type ProductPageType from '../../entities/product/model/ProductPageType'
import { AppContext } from '../../features/app_context/AppContext'
import './ui/Product.css'
import ProductDao from '../../entities/product/api/ProductDao'

export default function Product() {
    const { setBusy, isBusy } = useContext(AppContext)
    const { slug } = useParams<string>()
    const [pageData, setPageData] = useState<ProductPageType | null>(null)

    useEffect(() => {
        if (slug) {
            setBusy(true)
            ProductDao
                .getProduct(slug)
                .then(setPageData)
                .catch(err => {
                    setPageData(null)
                    console.error(err)
                })
                .finally(() => setBusy(false))
        }
    }, [slug])

    return <div>

    </div>
}