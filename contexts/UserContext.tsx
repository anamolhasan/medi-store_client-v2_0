'use client'

import { getCurrentUser } from '@/services/auth/auth';
import { User } from '@/types/user.type'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'


interface UserContextType {
    user: User | null;
    isLoading:boolean;
    setUser: (user: User | null) => void;
    refetchUser:()=> Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const {data, error} = await getCurrentUser()

      if(!error){
        setUser(data.data)
      } else {
        setUser(null);
      }
    } catch {
      setUser(null)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  const userInfo = {
    user,
    isLoading,
    setUser, 
    refetchUser:fetchUser
  }

  return (
    <UserContext.Provider value={userInfo}>
       {children}
    </UserContext.Provider>
  )
}

export function useUser(){
  const context = useContext(UserContext);
  if(context === undefined){
    throw new Error('use user must be used within a user provider')
  }

  return context
}