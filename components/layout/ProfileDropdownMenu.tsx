'use client'

import { useUser } from "@/contexts/UserContext"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Image from "next/image"
import { Button } from "../ui/button"
import { UserIcon } from "lucide-react"
import Link from "next/link"
import { Roles } from "@/constants/roles"
import { ModeToggle } from "./ModeToggle"

const ProfileDropdownMenu = () => {
    const {user, setUser} = useUser()

    const handleLogout = async () => {
        const toastId = toast.loading('User logout processing')

        try {
            const {data, error} = await authClient.signOut();

            if(error){
                toast.error(error.message, {id: toastId})
                return;
            }

            setUser(null)
            window.location.href = '/'
        } catch (error) {
            console.error(error);

            toast.error('something went wrong, please try again', {id: toastId})
        }
    }

    if(!user) return null

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {user?.image ? (
               <Image 
                 src={user.image}
                 alt="profile picture"
                 width={40}
                 height={40}
                 className="rounded-full cursor-pointer border border-primary p-0.5"
               />
            ):(
                <Button variant={'outline'} className="roundedf">
                    <UserIcon />
                </Button>
            )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mr-2" align="start">
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                    href={
                        user.role === Roles.admin
                        ? '/admin/profile'
                        : user.role === Roles.seller
                        ? '/seller/profile'
                        : '/customer/profile'
                    }
                    >
                    Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                    href={
                        user.role === Roles.admin
                        ? '/admin'
                        : user.role === Roles.seller
                        ? '/seller'
                        : '/customer'
                    }
                    >
                    Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ModeToggle />
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={()=> handleLogout()}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdownMenu