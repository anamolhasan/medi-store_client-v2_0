import React from 'react'

const DashboardLayout = ({
    admin,
    customer,
    seller
}:{
    admin:React.ReactNode,
    customer:React.ReactNode,
    seller:React.ReactNode,
}) => {
  return (
    <div>
      {admin}
      {customer}
      {seller}
    </div>
  )
}

export default DashboardLayout