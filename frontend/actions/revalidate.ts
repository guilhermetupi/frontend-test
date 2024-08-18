"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateShipments() {
    revalidateTag("shipments");
    redirect('/manage-shipments');
}

export async function revalidateAll() {
    revalidatePath("/");
}