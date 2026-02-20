'use server';

import { medicineService } from "@/services/medicine.service";
import { CreateMedicine, UpdateMedicine } from "@/types";
import { revalidateTag, updateTag } from "next/cache";


export const updateMedicine = async (id:string, data:UpdateMedicine) => {
    updateTag('medicines');
    return await medicineService.updateMedicine(id, data)
}

export const deleteMedicine = async(id:string) => {
    updateTag('medicines');
    return await medicineService.deleteMedicine(id)
}

export const createMedicine = async(data: CreateMedicine) => {
    const result = await medicineService.createMedicine(data);
    revalidateTag('medicines', 'profile');
    return result;
}