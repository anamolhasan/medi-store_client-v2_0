// lib/auth-client.ts
import { env } from "@/env"
import { createAuthClient } from "better-auth/react"

// export const authClient = createAuthClient({
//     // baseURL: "https://medi-store-server-rust.vercel.app",
//     baseURL: `${env.NEXT_PUBLIC_BACKEND_URL}`,
//     fetchOptions: {
//         credentials: "include", // এটি ছাড়া ক্রস-ডোমেইন কুকি কাজ করবে না
//     },
    
// })

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});


// console.log(env.NEXT_PUBLIC_BACKEND_URL)
