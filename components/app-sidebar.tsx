import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Routes } from "@/types";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { userRoutes } from "@/routes/userRoutes";
import Link from "next/link";
import LogOut from "./modules/authentication/logout";

export function AppSidebar({
  user,
   ...props 
  }:{
    user:{role:string};
  } & React.ComponentProps<typeof Sidebar>) {
    let routes: Routes[] = [];

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
        routes = [];
        break;
    }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>
                <Link href={'/'} className="flex items-center gap-2 relative w-35 h-10">
                 Medi Store
                </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-5">
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link href={item.url}
                      className="flex items-center justify-center"
                      >
                        {item.title}
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
           <SidebarMenuItem>
             <SidebarMenuButton asChild>
               <LogOut />
             </SidebarMenuButton>
           </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
