import { Routes } from "@/types";


export const sellerRoutes: Routes[] = [
    {
        title:'Seller Management',
        items:[
            {
                title:'Dashboard',
                url:'/seller/dashboard'
            },
            {
                title:'My Profile',
                url:'/seller/profile'
            },
            {
                title:'Medicines',
                url:'/seller/medicines'
            },
            {
                title:'Orders',
                url:'/seller/orders'
            }
        ]
    }
]