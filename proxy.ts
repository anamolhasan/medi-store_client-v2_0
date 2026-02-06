import { userService } from "@/services/user.service";
import { NextRequest } from "next/server";



export async function proxy(request:NextRequest){
    const pathname = request.nextUrl.pathname;
// console.log(pathname)
    // let isAuthenticated = false;
    // let isAdmin = false;
    // let isSeller = false;

    const {data} = await userService.getSession()
    // console.log(data)

    // if(data){
    //     isAuthenticated = true;
    //     isAdmin = data.user.role === 'ADMIN';
    //     isSeller = data.user.role === 'SELLER'
    // }

    
}