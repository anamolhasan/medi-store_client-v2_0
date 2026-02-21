import CheckOutPages from '@/components/modules/checkout/CheckOutPages';
import { userService } from '@/services/user.service';
import { User } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Checkout() {
    const { data: u } = await userService.getSession();
    const user: User = u.user;

    if(!user) return redirect("/login");

    return (
        <div className="container mx-auto my-10">
            <CheckOutPages user={user} />
        </div>
    );
}