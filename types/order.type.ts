import { Medicine } from "./medicine.type";
import { User } from "./user.type";



// enum
export enum OrderStatus {
    PLACED = 'PLACED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

// interfaces
export interface Order {
    id: string;
    customerId:string;

    status:OrderStatus;
    shippingAddress:string;
    totalAmount:number;

    createdAt:Date;
    updatedAt:Date;

    // Relations
    customer?:User;
    items?:OrderItem[]
}

export interface OrderItem {
    id:string;

    orderId: string;
    medicineId:string;

    quantity:number;
    price:number;

    createdAt:Date;

    //relations
    order?:Order;
    medicine?:Medicine;
}

export interface  CreateOrder {
    customerId: string;
    shippingAddress:string;
    items:{
        medicineId:string;
        quantity:number;
        price:number
    }[]
}