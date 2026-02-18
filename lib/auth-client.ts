// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // baseURL: "https://medi-store-server-rust.vercel.app",
    baseURL: "http://localhost:5000",
    fetchOptions: {
        credentials: "include", // এটি ছাড়া ক্রস-ডোমেইন কুকি কাজ করবে না
    },
})