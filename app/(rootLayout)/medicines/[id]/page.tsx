import MedicinesDetails from '@/components/modules/medicine/MedicineDetails';
import MedicinesReview from '@/components/modules/medicine/MedicineReview';
import { medicineService } from '@/services/medicine.service';
import { Medicine } from '@/types';
import React from 'react'

export default async function MedicineDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { data } = await medicineService.getMedicineById(id);
    const medicine: Medicine = data.data;

    return (
        <div className="container mx-auto">
            <MedicinesDetails medicine={medicine} />
            <MedicinesReview reviews={medicine.reviews || []} />
        </div>
    );
}