import MyProfile from '@/components/modules/MyProfile';
import { userService } from '@/services/user.service'
import { User } from '@/types';
import React from 'react'

const SellerProfile = async () => {
  const {data, error} = await userService.getCurrentUser();

  if(error) return <h1>{error.message}</h1>
  if(!data) return <h1>Loading...</h1>

  const user: User = data.data
  return (
    <>
      <MyProfile user={user} />
    </>
  )
}

export default SellerProfile