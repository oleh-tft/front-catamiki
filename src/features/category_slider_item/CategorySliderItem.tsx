import { NavLink } from 'react-router-dom'
import type { Category } from '../../entities/category/types/category'
import './ui/CategorySliderItem.css'

export default function CategorySliderItem({ category }: { category: Category}) {

    return <NavLink to={"/c/" + category.slug} className={"slider-item"}>
        {({ isActive }: { isActive: boolean }) => (
            <div className='category-small category-rect' style={{
                color: isActive ? "black" : "#565b60",
                borderBottom: isActive ? `4px solid ${category.color}` : "none"
            }}>
                <i className={category.smallIcon} style={{ color: isActive ? category.color : "#565b60" }}></i>
                <div className={"category-card-small-text"}>
                    {category.smallTitle}
                </div>
            </div>
        )}
    </NavLink>
}