import { Routes } from "@/types";


export const adminRoutes: Routes[] = [
    {
        title:'Admin Management',
        items:[
            {
                title:'Dashboard',
                url:'/admin/dashboard'
            },
            {
                title:'My Profile',
                url:'/admin/my-profile'
            },
            {
                title:'Categories',
                url:'/admin/categories'
            },
            {
                title:'Medicines',
                url:'/admin/medicines'
            },
            {
                title:'Orders',
                url:'/admin/orders'
            },
            {
                title:'Users',
                url:'/admin/users'
            },
        ]
    }
]