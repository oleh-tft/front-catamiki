import AllProducts from "../model/AllProducts"
import type ProductPageType from "../model/ProductPageType"

export default class ProductDao {
    static getProduct(slugOrId: string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allProducts = AllProducts.products
                const p = allProducts.find(p => p.slug == slugOrId || p.id == slugOrId)
                if (!p) {
                    reject("Not Found: " + slugOrId)
                }
                else {
                    resolve({
                        product: p,
                        recommended: allProducts.filter(x => x.id != p.id && x.categoryId === p.categoryId)
                    })
                }
            }, 700)
        })
    }
}