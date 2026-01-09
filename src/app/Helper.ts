import type { ProductType } from "../entities/product/model/ProductType"

function getSecondsRemaining(product: ProductType): number {
    const startDate: string = product.timestart
    const endDate: string = product.timeend

    const end = new Date(endDate)
    const now = new Date(startDate)
    //const now = new Date()
    const totalRemainingMs = end.getTime() - now.getTime()

    if (totalRemainingMs <= 0) {
        return 0
    }

    return Math.floor(totalRemainingMs / 1000)
}

export default {getSecondsRemaining}