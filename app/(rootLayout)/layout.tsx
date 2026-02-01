
import Navbar from '@/components/shared/Navbar'
import Navbar1 from '@/components/shared/Navbar1'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar1 />
        {/* <Navbar /> */}
        <main className='container mx-auto'>
            {children}
        </main>
        <footer>Footer</footer>
    </div>
  )
}

export default layout