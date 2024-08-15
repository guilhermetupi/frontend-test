import { Shipment, ShipmentStatus } from "../types";

export const shipmentsData: Shipment[] = [
    {
        id:"1",
        shipmentNumber: "SN123456",
        sendDate: new Date("2023-08-02"),
        lastUpdate: new Date("2023-08-05"),
        status: ShipmentStatus.DELIVERED,
        products: [],
    },
    {
        id:"2",
        shipmentNumber: "SN123457",
        sendDate: new Date("2024-03-01"),
        lastUpdate: new Date("2024-03-03"),
        status: ShipmentStatus.CANCELLED,
        products: [],
    }
];
