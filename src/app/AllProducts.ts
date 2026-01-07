import type { ProductType } from "../entities/product/model/ProductType";
import AllCategories from "./AllCategories";

const products: ProductType[] = [
    {
        id: "04d4962e-0a4d-4ca9-a495-b8e7a718a867",
        categoryId: "c9f55379-c997-4580-a723-f7a94ec0bca7",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond",
        bid: 450,
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        timestart: "2025-12-20 12:00:00",
        timeend: "2025-12-27 12:00:00"
    },
    {
        id: 'c989485b-29fe-4b43-9469-ff29425c8256',
        categoryId: "c0b8db50-3cab-4ceb-84aa-b36e4825dc14",
        name: "Jean Molinier (XX) - Composition abstraite",
        slug: "100072491-jean-molinier-xx-composition-abstraite",
        bid: 25,
        imageUrl: "/img/8594a05e-9006-4534-a893-d11038edbae1.jpg",
        likes: 15,
        timestart: "2025-12-27 4:00:00",
        timeend: "2025-12-27 12:00:00"
    },
    {
        id: 'af01a0f2-237f-4cd9-b771-a076ab8494d5',
        categoryId: "c0b8db50-3cab-4ceb-84aa-b36e4825dc14",
        name: "Innocente Salvini (1891-1979) - Neve al molino",
        slug: "99876381-innocente-salvini-1891-1979-neve-al-molino",
        bid: 240,
        imageUrl: "/img/ffc218e0-8d1c-498c-85aa-4516c6db25f5.jpg",
        likes: 23,
        timestart: "2025-12-27 12:00:00",
        timeend: "2025-12-27 12:15:00"
    }
]

function getAllProducts(categorySlug: string) {
    const category = AllCategories.categories.find(cat => cat.slug === categorySlug)
    if (category) {
        return products.filter(product => product.categoryId === category.id);
    }
    return []
}

export default { products, getAllProducts }