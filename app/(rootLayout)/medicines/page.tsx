import MedicineCards from '@/components/modules/medicine/MedicineCards';
import MedicinesPagination from '@/components/modules/medicine/MedicinesPagination';
import MedicinesQuery from '@/components/modules/medicine/MedicinesQuery';
import { medicineService } from '@/services/medicine.service';
import { Medicine } from '@/types';
import React from 'react'

export default async function MedicinesPage({
    searchParams,
}: {
    searchParams: Promise<{
        page: string;
        search: string;
        sortBy: string;
        sortOrder: string;
    }>;
}) {
    const { page, search, sortBy, sortOrder } = await searchParams;
    const { data } = await medicineService.getAllMedicines({
        page,
        search,
        sortBy,
        sortOrder,
    });
    const medicines: Medicine[] = data.data.data || [];
    const pagination = data.data.pagination || {
        limit: 10,
        page: 1,
        total: 10,
        totalPages: 1,
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-semibold mb-5 mx-5">
                Medicines {search}
            </h2>
            <MedicinesQuery />
            <MedicineCards medicines={medicines} />
            <MedicinesPagination meta={pagination} />
        </div>
    );
}
