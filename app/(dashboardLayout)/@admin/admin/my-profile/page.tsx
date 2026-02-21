import MyProfile from '@/components/modules/MyProfile';
import { userService } from '@/services/user.service'
import { User } from '@/types';
import React from 'react'

const AdminProfilePage =  async () => {
  const { data, error } = await userService.getCurrentUser();
  console.log(data)
  if (error) return <h1>{error.message}</h1>;
  if (!data) return <h1>Loading...</h1>

  const user: User | null = (data as any)?.data ?? null;
  if (!user) return <h1>Not authenticated</h1>;

  return (
    <>
    <MyProfile user={user}/>
    </>
  )
}

export default AdminProfilePage