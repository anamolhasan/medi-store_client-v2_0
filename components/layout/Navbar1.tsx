// components/Navbar.tsx
"use client";

import {
  ShoppingCart,
  User,
  Truck,
  Search,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../layout/ModeToggle";

export default function Navbar1() {
  return (
    <header className=" shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm md:text-2xl font-bold text-teal-600">
            💊MediStore
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex mx-4">
          <div className="flex border-2 border-teal-500 p-1">
            <InputGroup className="max-w-xs border-none ">
              <InputGroupInput placeholder="Search..." className="" />
              <InputGroupAddon>
                <Search className="" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
            <Button className="bg-teal-500 text-white px-4 py-2 rounded-l hover:bg-teal-600">
              Search
            </Button>
          </div>
        </div>


        {/* Icons / Actions */}
        <div className="flex items-center gap-4 font-bold">
          {/* dark mode button */}
             <ModeToggle />
          {/* track */}
          <Link
            href="/track"
            className="flex items-center gap-1  hover:text-teal-600"
          >
            <Truck className="w-10 h-10" />
            <p className="hidden md:inline leading-3">
              Track <br /> Your Order
            </p>
          </Link>

          {/* card */}
          <Link
            href="/cart"
            className="hover:text-teal-500 border-r-2 border-r-black pr-3"
          >
            {/* Icon wrapper */}
            <div className=" flex gap-4 text-xl font-bold items-center">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />

                {/* Cart count */}
                <Badge
                  className="
              absolute -top-2 -right-2
              h-5 w-5
              rounded-full
              p-0
              flex items-center justify-center
              text-xs 
            "
                >
                  0
                </Badge>
              </div>
              {/* Text */}
              <p className="font-medium">Cart</p>
            </div>
          </Link>
          
          {/* login and user icon */}
          <div className="flex gap-4 items-center">
           <div>
              <Link
              href="/login"
              className="flex items-center gap-1  hover:text-teal-600"
            >
              <span className="hidden md:inline text-sm leading-4">
                Login / <br /> Register
              </span>
            </Link>
           </div>
            {/* Right Side Navigation */}
            <nav className="flex items-center gap-2 ">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="">
                    <Avatar className="">
                      <AvatarFallback className=" font-bold cursor-pointer">
                        <User className=""/>
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[200px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/customer/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/orders-details">Order Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/delivery">Delivery Address</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className=" cursor-pointer "
                      // onClick={handleLogOut}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer focus:bg-red-600"
                      // onClick={handleLogOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>

        </div>
      </div>

      {/* Navbar Links */}
      <nav className="bg-gray-200 dark:bg-gray-900 border-t border-gray-200 ">
        <div className="container mx-auto flex space-x-8  p-4">
          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>
          <Link href="/medicines" className="hover:text-teal-600">
            Medicines
          </Link>
          <Link href="/products" className="hover:text-teal-600">
            Products
          </Link>
          <Link href="/equipment" className="hover:text-teal-600">
            Equipment
          </Link>
          <Link href="/doctor" className="hover:text-teal-600">
            Online Doctors
          </Link>
        </div>
      </nav>
    </header>
  );
}
