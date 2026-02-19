import { Roles } from '@/constants/roles';
import { userService } from '@/services/user.service'
import { Role, Routes } from '@/types';
import React from 'react'

const DashboardLayout = async ({
    admin,
    customer,
    seller
}:{
    admin:React.ReactNode,
    customer:React.ReactNode,
    seller:React.ReactNode,
}) => {
  const {data} = await userService.getSession();

  const user = data.user;
  const role = data?.user?.role as Role | undefined;

  const roleView = {
    ADMIN: admin,
    SELLER: seller,
    CUSTOMER: customer,
  } as const

  if(!role) return null;

  let routes : Routes[] = []

  switch (user.role){
    case Roles.admin:
      routes = 
  }
  return (
    <div>
      {admin}
      {customer}
      {seller}
    </div>
  )
}

export default DashboardLayout