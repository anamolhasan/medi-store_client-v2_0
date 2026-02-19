import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const NotFount = () => {
   return (
        <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href={`/`}>
                <Button className="cursor-pointer">Return Home</Button>
            </Link>
        </div>
    );
}

export default NotFount