import { env } from "@/env";
import { cookies } from "next/headers";


const API_URL = env.API_URL;

export const categoryService = {
    getAllCategories: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/v1/category`, {
                headers:{
                    Cookie: cookieStore.toString()
                },
                cache:'no-store',
                next:{tags:['categories']}
            });
            const session = await res.json()
            if(!session){
                return {
                    data:null,
                    error:{message:'no category found', error:null}
                }
            }

            return {data: session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error: {message:'Something went wrong', error}
            }
        }
    },

    addCategories: async (name:string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/v1/category`, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Cookie:cookieStore.toString(),
                },
                body: JSON.stringify({name}),
                cache:'no-store',
            })

            if(!res.ok){
                const errBody = await res.json().catch(()=> null);
                return {
                    data:null,
                    error:{
                        message:
                        errBody?.message ?? 'Failed to create category',
                        error: errBody ?? null,
                    }
                }
            }

            const created = await res.json();
            return {data: created, error: null};
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error: {message:'Something went wrong', error}
            }
        }
    },

    deleteCategories: async (id:string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/v1/category/${id}`, {
                method: 'DELETE',
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store',
            });

            // Some APIs return 204 with no body
            const data = await res.json().catch(()=> null)

            if(!res.ok){
                return {
                    data:null,
                    error:{
                        message:{
                            message:data?.message ?? 'Failed to delete category',
                            error:data ?? null
                        }
                    }
                }
            }
            return {data, error:null}
        } catch (error) {
            return {
                data:null,
                error: {message:'Something went wrong', error}
            }
        }
    },

    updateCategories: async (id:string, name:string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/v1/category/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    Cookie:cookieStore.toString(),
                },
                body:JSON.stringify({name}),
                cache:'no-store',
            })

            // some APIs return 204 No Content
            const data = await res.json().catch(()=>null)

            if(!res.ok){
                return {
                    data:null,
                    error:{
                        message:data?.message ?? 'Failed to update categories',
                        error:data ?? null
                    }
                }
            }
            return {data, error:null}
        } catch (error) {
            console.log(error);
            return {
                data:null,
                error:{message:'Something went wrong', error},
            }
        }
    }


}