'use server'

import { userService } from "@/services/user.service"
import { UpdateUser } from "@/types"
import { updateTag } from "next/cache"


export async function getCurrentUser(){
    return await userService.getCurrentUser()
}

export async function getUser(userId:string){
    return await userService.getUser(userId)
}

export const updateUser = async (id:string, data:UpdateUser) => {
    const res = await userService.updateUser(id, data);
    updateTag('users');
    updateTag('me');
    return res
}


