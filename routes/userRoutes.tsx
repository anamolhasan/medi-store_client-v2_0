import { Routes } from "@/types";


export const userRoutes:Routes[] = [
    {
        title:'User Management',
        items:[
            {
                title:'Dashboard',
                url:'/customer/dashboard'
            },
            {
                title:'My Profile',
                url:'/customer/profile'
            },
            {
                title:'My Orders',
                url:'/customer/my-orders'
            },
        ]
    }
]