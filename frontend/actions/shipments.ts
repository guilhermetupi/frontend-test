"use server";

import { revalidatePath } from "next/cache";

let url = process.env.API_URL;

export const fetchAllShipments = async (): Promise<{
    id: string;
    shipmentNumber: string;
    sendDate: Date;
    lastUpdate: Date;
    status: string;
}[]> => {
    const response = await fetch(url + `/shipments`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch shipments');
    }

    return response.json();
};

export const fetchShipmentById = async (id: string): Promise<{
    id: string;
    shipmentNumber: string;
    sendDate: Date;
    lastUpdate: Date;
    status: string;
    products: { id: string; name: string }[];
}> => {
    const response = await fetch(url + `/shipments/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch shipment with ID: ${id}`);
    }

    return response.json();
};

export const createShipment = async (shipmentData: {
  products: { id: string; name: string }[];
}): Promise<void | { error: string }> => {
  const response = await fetch(url + `/shipments`, {
      cache: 'force-cache',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipmentData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error };
  }

  revalidatePath('/shipments');
};
