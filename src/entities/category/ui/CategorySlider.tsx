import { useEffect, useRef, useState } from 'react';
import type { Category } from '../types/category';
import './CategorySlider.css'
import CategoryDao from '../api/CategoryDao';
import CategorySliderItem from '../../../features/category_slider_item/CategorySliderItem';

const basicCategories:Array<Category> =  [
        {
            title: "This week",
            color: "#0033FF",
            slug: "../",
            smallTitle: "This week",
            smallIcon: "bi bi-cash"
        },
        {
            title: "For you",
            color: "#0033FF",
            slug: "for-you",
            smallTitle: "For you",
            smallIcon: "bi bi-stars"
        },
        {
            title: "Trending",
            color: "#0033FF",
            slug: "trending",
            smallTitle: "Trending",
            smallIcon: "bi bi-fire"
        }
    ]

export default function CategorySlider() {
    const [categories, setCategories] = useState<Categories | null>({categories: basicCategories})
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollRightClick = () => {
        scrollRef.current?.scrollBy(scrollRef.current?.clientWidth, 0)
    }

    const scrollLeftClick = () => {
        scrollRef.current?.scrollBy(-scrollRef.current?.clientWidth, 0)
    }

    useEffect(() => {
        CategoryDao.getCategories().then(c => {
            setCategories({ categories: basicCategories.concat(c) })
        })
    }, [])

    return <div className='categories-box'>
        <div className='categories-scroll-wrap' ref={scrollRef}>
            {categories?.categories.map(c => <CategorySliderItem category={c} key={c.title}/>)}
            <div className='categories-arrow-right' role='button' onClick={scrollRightClick}><i className="bi bi-chevron-right"></i></div>
            <div className='categories-arrow-left' role='button' onClick={scrollLeftClick}><i className="bi bi-chevron-left"></i></div>
        </div>
    </div>
}

type Categories = {
    categories: Array<Category>;
}