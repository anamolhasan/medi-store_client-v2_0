/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import { FieldValues } from "react-hook-form";
export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    revalidatePath("USER");
    const result = await res.json();
    console.log(result);
    const storeCookies = await cookies();
    if (result.success) {
      storeCookies.set("token", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getCurrentUser
export const getCurrentUser = async (): Promise<any> => {
  const accessToken = (await cookies()).get("token")?.value;
//   let decodedData = null;

//   if (accessToken) {
//     decodedData = await jwtDecode(accessToken);
//     return decodedData;
//   } else {
//     return null;
//   }
};

export const logOut = async () => {
  const storeCookies = await cookies();
  storeCookies.delete("token");
};
