import AddCategory from '@/components/modules/admin/category/AddCategory'
import CategoryTable from '@/components/modules/admin/category/CategoryTable'
import { categoryService } from '@/services/category.service'
import { Category } from '@/types'
import React from 'react'

const CategoriesPage = async () => {
  const {data} = await categoryService.getAllCategories()
  const categories: Category[] = data.data
  return (
    <div>
      <div>
         <h2 className="text-2xl font-semibold mb-5">Category Management</h2>
         <AddCategory />
      </div>
      <CategoryTable categories={categories}/>
    </div>
  )
}

export default CategoriesPage