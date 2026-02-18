import { env } from "@/env";
import { cookies } from "next/headers";


const API_URL = env.API_URL

interface GetMedicineParams {
    search?:string;
    page?:string;
    limit?:string;
    sortBy?:string;
    sortOrder?:string;
}

export const medicineService = {
    getAllMedicines: async (params?:GetMedicineParams) => {
        try {
            const cookieStore = await cookies();
            const url  = new URL(`${API_URL}/api/v1/medicine`);

            if(params){
                Object.entries(params).forEach(([key, value])=> {
                    if(value !== undefined && value !== null && value !== ''){
                        url.searchParams.set(key, value)
                    }
                })
            }

            const config: RequestInit = {
                headers:{
                    Cookie:cookieStore.toString(),
                }
            };

            config.next = {
                ...config.next,
                tags:['medicines']
            }

            const res = await fetch(url.toString(), config);
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No medicine found', error:null}
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

    getMedicineById: async (id:string) => {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/api/v1/medicine/${id}`, {
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store',
            })
            const session = await res.json();
            if(session === null){
                return {
                    data:null,
                    error:{message:'No medicine found', error:null}
                }
            }

            return {data:session, error:null}
        } catch (error) {
            console.log(error)
            return {
                data:null,
                error:{message:'Something went wrong', error},
            }
        }
    },

    deleteMedicine: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/v1/medicine/${id}`, {
                method:"DELETE",
                headers:{
                    Cookie:cookieStore.toString(),
                },
                cache:'no-store',
            })

            // Some APIs return 204 with on body
            const data = await res.json().catch(()=> null)

            if(!res.ok){
                return {
                    data:null,
                    error:{
                        message:data?.message ?? 'Failed to delete medicine', 
                        error:data ?? null
                    }
                }
            }

            return {data, error:null}
        } catch (error) {
            console.log(error);
            return {
                data:null,
                error:{message:'Something went wrong', error}
            }
        }
    },

    updateMedicine: async (id:string, data:UpdateMedicine)
}