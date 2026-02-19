import { redirect } from 'next/navigation'
import React from 'react'

const DefaultAdmin = () => {
  redirect('/admin/my-profile')
}

export default DefaultAdmin