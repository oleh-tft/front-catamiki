import type AuctionCartType from "../model/AuctionCartType"

export default class AuctionDao {
    static #cartKey = "cm-cart"
    static #cartDefault: AuctionCartType = { items: [] }

    static save(cart: AuctionCartType) {
        window.localStorage.setItem(this.#cartKey, JSON.stringify(cart))
    }

    static restoreSaved(): AuctionCartType {
        const data = window.localStorage.getItem(this.#cartKey)
        if (data) {
            try {
                return JSON.parse(data)
            }
            catch (err) {
                console.error("Cart restore error:", err)
            }
        } 
        return this.#cartDefault
    }

    static calcPrices(cart: AuctionCartType) {
        let total = 0.0
        for (let ci of cart.items) {
            total += ci.finalBid
        }
        return total
    }
}