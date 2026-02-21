import CheckOutPages from '@/components/modules/checkout/CheckOutPages';
import { userService } from '@/services/user.service';
import { User } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic';

export default async function Checkout() {
    const { data: u } = await userService.getSession();
    const user: User | null = u?.user ?? null;

    if (!user) return redirect('/login');

    return (
        <div className="container mx-auto my-10">
            <CheckOutPages user={user} />
        </div>
    );
}