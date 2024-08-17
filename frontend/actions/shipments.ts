"use server";

import { revalidateTag } from "next/cache";

let url = process.env.API_URL;

export const fetchAllShipments = async (): Promise<{
    id: string;
    shipmentNumber: string;
    sendDate: Date;
    lastUpdate: Date;
    status: string;
}[]> => {
    const response = await fetch(url + `/shipments`, {
        cache: 'force-cache',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch shipments');
    }

    revalidateTag('shipments-list');
    
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
        cache: 'no-cache',
        next: {
            tags: ['shipment-' + id]
        }
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipmentData),
      cache: 'no-store',
      next: {
        tags: ['shipments-list'],
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error };
    }

  };
