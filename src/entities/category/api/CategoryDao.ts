import AllCategories from "../../../app/AllCategories";
import AllProducts from "../../../app/AllProducts";
import type { CategoryType } from "../model/CategoryType";
import type { Category } from "../types/category";

export default class CategoryDao {
    static cacheCategories: Array<Category> | undefined

    static getCategories() {
        return new Promise<Array<Category>>((resolve, reject) => {
            if (typeof CategoryDao.cacheCategories != 'undefined') {
                resolve(CategoryDao.cacheCategories)
            }
            setTimeout(() => {
                CategoryDao.cacheCategories = AllCategories.categories
                resolve(CategoryDao.cacheCategories)
            }, 300)
        })
    }

    static getCategory(slug: string) {
        return new Promise<CategoryType>((resolve, reject) => {
            setTimeout(() => {
                if (!AllCategories.categories.find(c => c.slug  === slug)) {
                    reject('"Slug not found"')
                }
                resolve({
                    products: AllProducts.getAllProducts(slug)
                })
            }, 300)
        })
    }
}