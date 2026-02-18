"use client";

import { Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useUser } from "@/contexts/UserContext";
import { Roles } from "@/constants/roles";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    className?:string;
    logo?:{
        url:string;
        alt:string;
        title:string;
        className?:string;
    };
    menu?:MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar2 = ({
    logo = {
        url:'/',
        alt:'logo',
        title:'Medi Store'
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Medicines",
            url: "/medicines",
        },
        {
            title: "Pharmacy",
            url: "/pharmacy",
        },
        {
            title: "Dashboard",
            url: "/customer",
        },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Register", url: "/register" },
    },
    className,
}: NavbarProps) => {
  
   const {user, setUser} = useUser();
   const totalItems = 0
console.log(user)
   const dashboardUrl = (()=> {
    const role = (user as {role?:string} | null)?.role;
    switch(role){
        case Roles.admin:
            return '/admin';
        case Roles.seller:
            return '/seller';
        case Roles.customer:
            return '/customer';
        default:
            return '/customer'
    }
   })()

   const menuWithDashboard = menu.map((item) => 
    item.title === 'Dashboard'? {...item, url:dashboardUrl} : item,
)

    return (
        <section className={cn("py-4 w-full sticky top-0 z-10 bg-white", className)}>
            <div className="container mx-auto px-4">
              {/* Desktop Menu */}
                <nav className="hidden items-center justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <Link
                            href={logo.url}
                            className="flex items-center gap-2 relative w-35 h-10"> 
                             {/* akane akta logo dete hobe */}
                            <span>medi store</span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                        {/* cart button */}
                        <Button >
                            <ShoppingCart className="h-5 w-5"/>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Button>
                        {
                            user ? (
                                <>
                                {
                                    user?.role === Roles.customer && (
                                        <>
                                        {/* <Link href={'/become-partner'}>
                                            <Button className="bg-orange-400 hover:bg-orange-500">
                                                Become a Partner
                                            </Button>
                                        </Link> */}
                                        </>
                                    )
                                }
                                <ProfileDropdownMenu />
                                </>
                            ):(
                                <>
                                 {/* <Link href="/become-partner">
                                    <Button className="bg-orange-400 hover:bg-orange-500">
                                        Become a Partner
                                    </Button>
                                </Link> */}

                                <Button asChild variant={'outline'} size={'sm'}>
                                    <Link href={auth.login.url}>{auth.login.title}</Link>
                                </Button>
                                <Button asChild  size={'sm'}>
                                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                                </Button>
                                </>
                            )
                        }
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href={logo.url}
                            className="flex items-center gap-2 relative w-10 h-10"
                        >
                          <span>Medi store</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            {/* mobile cart button */}
                            <Button>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </Button>
                            <ModeToggle />
                            <Sheet>
                                <SheetTrigger
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link
                                                href={'/'}
                                                className="flex items-center gap-2"
                                            >
                                               Medi store 
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="flex w-full flex-col gap-4"
                                        >
                                            {menuWithDashboard.map((item) =>
                                                renderMobileMenuItem(item),
                                            )}
                                        </Accordion>
                                    </div>
                                    <SheetFooter>
                                        {user ? (
                                            <>
                                            {
                                                user?.role === Roles.customer && (
                                                    <>
                                                    <Link href="/become-partner">
                                                        <Button className="bg-orange-400 hover:bg-orange-500">
                                                            Become a Partner
                                                        </Button>
                                                    </Link>
                                                    </>
                                                )
                                            }
                                            <ProfileDropdownMenu />
                                            </>
                                        ) : (
                                            <>
                                            {/* <Link href="/become-partner">
                                                    <Button className="bg-orange-400 hover:bg-orange-500">
                                                    Become a Partner
                                                    </Button>
                                                </Link> */}

                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={auth.login.url}>
                                                    {auth.login.title}
                                                    </Link>
                                                </Button>
                                                <Button asChild size="sm">
                                                    <Link href={auth.signup.url}>
                                                    {auth.signup.title}
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                           
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Sheet */}
            <span>Cart Sheet</span>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                asChild
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                <Link href={item.url}>{item.title}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    return (
        <Link
            key={item.title}
            href={item.url}
            className="text-md font-semibold"
        >
            {item.title}
        </Link>
    );
};

export { Navbar2 };
