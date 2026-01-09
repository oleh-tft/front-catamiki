import type { ProductType } from "../../product/model/ProductType";

export default interface AuctionCartItem {
    item: ProductType,
    finalBid: number,
    ordered: boolean,
    received: boolean
}