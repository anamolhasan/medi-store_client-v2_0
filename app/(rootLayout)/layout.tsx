'use client'

import Footer1 from '@/components/layout/Footer1'
import { Navbar2 } from '@/components/layout/Navbar2'


const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Navbar2 />
 
        <main className='container mx-auto'>
            {children}
        </main>
    
        <Footer1 />
    </div>
  )
}

export default layout