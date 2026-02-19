import UserTable from '@/components/modules/admin/users/UserTable'
import { userService } from '@/services/user.service'
import { User } from '@/types'
import React from 'react'


export const metadata = {
  title:'User Management | Admin Dashboard',
}
const UsersPage = async () => {
  const [u] = await Promise.all([userService.getAllUsers()])
  const users: User[]= u?.data?.data;
  return (
    <div>
            <h2 className="text-2xl font-semibold mb-5">User Management</h2>
            <UserTable users={users} />
        </div>
  )
}

export default UsersPage