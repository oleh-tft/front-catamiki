import { Link } from "react-router-dom";
import type { Category } from "../../entities/category/types/category";
import "./ui/CategoryCard.css"

export default function CategoryCard({category}: {category: Category}) {
    return <Link to={"/c/" + category.slug} className="category-card" style={{backgroundColor: category.color}}>
        <div className="category-card-text">{category.title}</div>
        <div className="card-img"><img src={category.imageUrl} alt={category.title} /></div>
    </Link>
}