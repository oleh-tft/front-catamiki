import "./ui/Section.css"
import ProductCard from "../../entities/product/ui/ProductCard"

export default function Section() {
    // const {slug} = useParams()
    // const [pageData, setPageData] = useState<SectionType|null>(null)

    // useEffect(() => {
    //     if (typeof(slug) != 'undefined') {
    //         SectionDao.getSection(slug).then(setPageData)
    //     }
    // }, [])

    const test = [
        {
        id: "1",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    },
    {
        id: "2",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    },
    {
        id: "3",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    },
    {
        id: "4",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    },
    {
        id: "5",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    },
    {
        id: "6",
        name: "2 piece jewellery set - 18 kt. Yellow gold -  2.19ct. tw. Emerald - Diamond",
        bid: 450,
        timeleft: "10 hours",
        imageUrl: "/img/9650a0bd-bf95-4e4e-96c4-d3f4881837d8.jpg",
        likes: 20,
        slug: "99764256-2-piece-jewellery-set-18-kt-yellow-gold-2-19ct-tw-emerald-diamond"
    }
    ]

    return <>
        <div className="products-container">
            {test?.map(product => <ProductCard product={product} key={product.id}/>)}
        </div>
    </>
}