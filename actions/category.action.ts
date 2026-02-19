'use server'

import { categoryService } from "@/services/category.service";
import { updateTag } from "next/cache";



export const createCategory = async (name:string) => {
    updateTag('categories');
    return await categoryService.addCategories(name)
}

export const deleteCategory = async (id:string) => {
    updateTag('categories');
    return await categoryService.deleteCategories(id)
}

export const updateCategory = async (id: string, name:string) => {
    updateTag('categories');
    return await categoryService.updateCategories(id, name)
}