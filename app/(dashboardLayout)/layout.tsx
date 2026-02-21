export const dynamic = 'force-dynamic'

import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Roles } from '@/constants/roles';
import { adminRoutes } from '@/routes/adminRoutes';
import { sellerRoutes } from '@/routes/sellerRoutes';
import { userRoutes } from '@/routes/userRoutes';
import { userService } from '@/services/user.service'
import { Role, Routes } from '@/types';
import React from 'react'

const DashboardLayout = async ({
    admin,
    customer,
    seller
}:{
    admin:React.ReactNode,
    customer:React.ReactNode,
    seller:React.ReactNode,
}) => {
    const { data } = await userService.getSession();

    if (!data || !data.user) return null;

    const user = data.user;
    const role = data.user.role as Role | undefined;

  const roleView = {
    ADMIN: admin,
    SELLER: seller,
    CUSTOMER: customer,
  } as const

  if(!role) return null;

  let routes : Routes[] = []

  switch (user.role){
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    case Roles.customer:
      routes = userRoutes;
      break;
      default:
        routes = []
        break;
  }
  return (
     <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        {routes[0].title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {roleView[role]}
                </div>
            </SidebarInset>
        </SidebarProvider>
  )
}

export default DashboardLayout