import { env } from "@/env"
import { UpdateUser } from "@/types/user.type";
import { cookies } from "next/headers"


const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
      getSession: async () => {
        try {
            const cookieStore = await cookies();
            

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (!session) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

//  getSession: async () => {
//     try {
//         // const { cookies } = await import("next/headers");
//         const cookieStore = await cookies();
        
//         // সব কুকি সরাসরি স্ট্রিং আকারে নিন
//         const cookieHeader = cookieStore.toString(); 

//         const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
//             headers: {
//                 // ব্রাউজারের অরিজিনাল কুকি হেডারটি হুবহু পাঠান
//                 "Cookie": cookieHeader,
//                 "Accept": "application/json",
//             },
//             cache: "no-store",
//         });

//         if (!res.ok) return { data: null, error: "Unauthorized" };

//         const session = await res.json();
        
//         // Better Auth অনেক সময় সেশন না থাকলে null পাঠায়
//         if (!session || !session.user) {
//             return { data: null, error: "No session" };
//         }

//         return { data: session, error: null };
//     } catch (error) {
//         console.error("Session Fetch Error:", error);
//         return { data: null, error };
//     }
// },

    getMyProfile: async () => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/user/me`, {
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:"no-store",
                next:{tags:["me"]},
            })
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No session found', error:null}
                }
            }

            return {data: session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    },

    getAllUsers: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/user`, {
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store',
                next:{tags:['users']}
            });

            const session = await res.json()
            if(session === null){
                return {
                    data:null,
                    error:{message:"No session found", error:null}
                }
            }

            return {data:session, error:null}
        } catch (error) {
            console.log(error);
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    },

    getCustomerStats: async () => {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${API_URL}/user/customer/status`, {
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store'
            })
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No session found', error:null}
                }
            }
            return {data:session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error:{message:"Something went wrong", error}
            }
        }
    },

    getSellerStats: async () => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/user/seller/status`, {
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store'
            })

            const session = await res.json()
            if(session === null){
                return {
                    data:null,
                    error:{message:'No session found', error:null}
                }
            }

            return {data: session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    },

    getAdminStats: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/user/admin/status`,{
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store'
            });
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No session found', error:null}
                }
            }
            return {data:session, error:null}
        } catch (error) {
            console.log(error);
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    },

    updateUser: async (id:string, data:UpdateUser) => {
          try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/user/${id}`, {
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json",
                    Cookie:cookieStore.toString(),
                },
                body:JSON.stringify(data),
                cache:'no-store'
            })

            if(!res.ok){
                const errBody = await res.json().catch(()=> null);
                return {
                    data:null,
                    error:{
                        message:errBody?.message?? 'Failed to update user',
                        error:errBody??null,
                    }
                }
            }

            const updated = await res.json()
            return {data:updated, error:null};
                    } catch (error) {
                        console.log(error)
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
          }
    }
}

