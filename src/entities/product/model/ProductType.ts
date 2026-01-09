import type { BidderType } from "../../bidder/model/BidderType"

type ProductType = {
    id: string,
    categoryId: string,
    name: string,
    description: string,
    slug: string|undefined,
    bid: number,
    imageUrl: string,
    likes?: number,
    timestart: string,
    timeend: string,
    details?: Record<string, string>,
    bidders?: BidderType[],
    delivery: number
}

export type { ProductType }