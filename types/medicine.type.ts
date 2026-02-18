import { Category } from "./category.type";
import { User } from "./user.type";


export interface Medicine {
    id:string;
    name:string;
    description:string;
    price:number;
    stock:number;
    manufacturer:string;
    imageUrl:string;

    categoryId:string;
    sellerId:string;

    createdAt:Date;
    updatedAt:Date;

    // Relations (usually optional, depending on your query)
    category?:Category;
    seller?:User;
}