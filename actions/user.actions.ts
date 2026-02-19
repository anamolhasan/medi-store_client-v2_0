'use server'

import { userService } from "@/services/user.service"


export async function getCurrentUser(){
    return await userService.getCurrentUser()
}

export async function getUser(userId:string){
    return await userService.getUser(userId)
}

export async function getUsers(
    params:{
        search?:string;
        page?:string;
        limit?:string;
        sortBy?:string;
        sortOrder?:string;
    }
){
   return await userService.getAllUsers(params)
}


