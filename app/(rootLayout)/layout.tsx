
import Footer from '@/components/layout/Footer'
import Navbar1 from '@/components/layout/Navbar1'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar1 />
        {/* <Navbar /> */}
        <main className='container mx-auto'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default layout