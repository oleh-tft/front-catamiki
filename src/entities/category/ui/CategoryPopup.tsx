import CategoryCard from '../../../features/category_card/CategoryCard'
import CategoryDao from '../api/CategoryDao'
import type { Category } from '../types/category'
import './CategoryPopup.css'
import { useEffect, useState } from "react"

export default function CategoryPopup() {
    const [darkBg, setDarkBg] = useState<boolean>(false)
    const [categories, setCategories] = useState<Categories | null>(null)

    useEffect(() => {
        CategoryDao.getCategories().then(c => {
            setCategories({categories: c})
        })
    }, [])

    return <>
        <div className="nav-text-interactable" onClick={() => setDarkBg(true)}>
            <span className='px-1'>Categories</span>
            <i className="bi bi-chevron-compact-down icon-blue"></i>
        </div>
        {darkBg &&
            <div className='categories-popup-bg' onClick={() => setDarkBg(false)}>
                <div className="categories-popup" onClick={e => e.stopPropagation()}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='categories-popup-text'>Categories</div>
                        <div className='categories-close'><i className="bi bi-x icon-blue-hoverable"></i></div>
                    </div>
                    <div className='categories-wrap' onClick={() => setDarkBg(false)}>
                        {categories?.categories.map(c => <CategoryCard category={c}  key={c.title}/>)}
                    </div>
                </div>
            </div>
        }
    </>
}

type Categories = {
    categories: Array<Category>;
}