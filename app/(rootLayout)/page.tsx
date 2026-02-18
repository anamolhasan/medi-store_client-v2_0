import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function Home() {
   const {data: session} = await userService.getSession()
  console.log(session)
   if(!session?.user){
    return <div>Public Home</div>
   }
    
   const role = session.user.role 

  // Role অনুযায়ী রিডাইরেক্ট
   if (role === Roles.admin) redirect('/admin');
   if (role === Roles.seller) redirect('/seller');
   if (role === Roles.customer) redirect('/customer');
   
   return null;
}
