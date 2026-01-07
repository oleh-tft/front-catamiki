import type ProductPageType from "../model/ProductPageType"

export default class ProductDao {
    static getProduct(slugOrId: string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allProducts = [p1, p2, p3, p4, p5, p6]
                const p = allProducts.find(p => p.slug == slugOrId || p.id == slugOrId)
                if (!p) {
                    reject("Not Found: " + slugOrId)
                }
                else {
                    resolve({
                        product: p,
                        recommended: allProducts.filter(x => x.id != p.id)
                    })
                }
            }, 700)
        })
    }
}