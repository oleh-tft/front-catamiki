import type AuctionCartType from "../model/AuctionCartType"

export default class AuctionDao {
    static #cartKey = "cm-cart"
    static #activeKey = "cm-active"
    static #cartDefault: AuctionCartType = { items: [] }

    static save(cart: AuctionCartType) {
        window.localStorage.setItem(this.#cartKey, JSON.stringify(cart))
    }

    static saveActive(active: AuctionCartType) {
        window.localStorage.setItem(this.#activeKey, JSON.stringify(active))
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

    static restoreSavedActive(): AuctionCartType {
        const data = window.localStorage.getItem(this.#activeKey)
        if (data) {
            try {
                return JSON.parse(data)
            }
            catch (err) {
                console.error("Active restore error:", err)
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