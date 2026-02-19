
import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request:NextRequest){
    const pathname = request.nextUrl.pathname;
    let isAuthenticated:boolean = false;
    let userRole: string | null = null

    const {data} = await userService.getSession()
// console.log(data,'data is proxy')
    if(data){
        isAuthenticated = true;
        userRole = data?.user?.role;
    }

    // user is not authenticated
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const roleDashboardMap: Record<string, string> = {
        [Roles.admin]:'/admin',
        [Roles.seller]:'/seller',
        [Roles.customer]:'/customer'
    }

    // Get the correct dashboard for the user's role
    const userDashboard = roleDashboardMap[userRole as string];

    // if user tries to access a dashboard that's not theirs, redirect to their dashboard
    // //    🔒 Admin guar
    if(pathname.startsWith('/admin') && userRole !== Roles.admin){
        return NextResponse.redirect(new URL(userDashboard, request.url))
    }
    if(pathname.startsWith('/seller') && userRole !== Roles.seller){
        return NextResponse.redirect(new URL(userDashboard, request.url))
    }
    if(pathname.startsWith('/customer') && userRole !== Roles.customer){
        return NextResponse.redirect(new URL(userDashboard, request.url))
    }


    // Default allow access
    return NextResponse.next();

}

export const config = {
    matcher:[
        '/admin',
        '/seller',
        '/customer',
        '/admin/:path*',
        '/seller/:path*',
        '/customer/:path*'
    ]
}