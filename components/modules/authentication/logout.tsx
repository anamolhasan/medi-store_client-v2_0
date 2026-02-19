'use client'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../../ui/button'
import { LogOutIcon } from "lucide-react";

const LogOut = () => {
    const router = useRouter()

    const handleLogout = async () => {
        const toastId = toast.loading("Loading out...")

        try {
            await authClient.signOut()
            toast.success('Logged out successfully', {id:toastId})

            router.push('/')
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error('Failed to logout', {id:toastId})
        }
    }
  return (
    <Button
     variant={'outline'}
     onClick={handleLogout}
     className='text-red-500 hover:text-red-600 flex items-center justify-center cursor-pointer w-full'
    >
        <LogOutIcon className='mr-2 h-4 w-4'/>
        Logout
    </Button>
  )
}

export default LogOut