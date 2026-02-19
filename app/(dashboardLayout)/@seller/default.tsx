import { redirect } from 'next/navigation'
import React from 'react'

const DefaultSeller = () => {
  redirect('/seller/profile')
}

export default DefaultSeller