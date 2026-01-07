type ProductType = {
    id: string,
    categoryId: string,
    name: string,
    slug: string|undefined,
    bid: number,
    imageUrl: string,
    likes?: number,
    timestart: string,
    timeend: string
}

export type { ProductType }