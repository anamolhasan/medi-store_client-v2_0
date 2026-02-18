'use server'

import { userService } from "@/services/user.service"


export async function getCurrentUser(){
    return await userService.getCurrentUser()
}

export async function getUser(userId:string){
    return ''
}