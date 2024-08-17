// app/manage-shipments/page.tsx
"use client";

import MainHeader from "@/components/MainHeader/page";
import { Button, Table } from "antd";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { fetchAllShipments, fetchShipmentById } from "@/actions/shipments";
import getTranslation, { Translations } from "@/utils/translate";
import ShipmentDetails from "@/components/ShipmentModal/page";

interface Product {
    id: string;
    name: string;
}

interface Shipment {
    id: string;
    shipmentNumber: string;
    sendDate: Date;
    lastUpdate: Date;
    status: string;
    products?: Product[];
}

export default function ManageShipments() {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

    const showLoading = async (id: string) => {
        setOpen(true);
        setLoading(true);

        try {
            const shipmentDetails = await fetchShipmentById(id);
            setSelectedShipment(shipmentDetails);
        } catch (error) {
            console.error("Failed to fetch shipment details:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchShipments = useCallback(async () => {
        try {
            const data = await fetchAllShipments();
            setShipments(data);
        } catch (error) {
            console.error("Failed to fetch shipments:", error);
        }
    }, []);

    useEffect(() => {
        fetchShipments();
        const intervalId = setInterval(fetchShipments, 5000);
        return () => clearInterval(intervalId);
    }, [fetchShipments]);

    const columns = [
        {
            title: "Número da remessa",
            dataIndex: "shipmentNumber",
            key: "shipmentNumber",
        },
        {
            title: "Data de envio",
            dataIndex: "sendDate",
            key: "sendDate",
            render: (date: Date) => {
                return new Date(date).toLocaleDateString();
            },
        },
        {
            title: "Última atualização",
            dataIndex: "lastUpdate",
            key: "lastUpdate",
            render: (date: Date) => {
                return new Date(date).toLocaleDateString();
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const userLang: keyof Translations = navigator.language.split("-")[0] as keyof Translations;
                return <span>{getTranslation(status, userLang)}</span>;
            },
        },
        {
            title: "Ações",
            dataIndex: "actions",
            key: "actions",
            render: (_: any, record: Shipment) => (
                <Button
                    type="primary"
                    onClick={() => showLoading(record.id)}
                >
                    Ver detalhes
                </Button>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <MainHeader />
            <div className="py-10 px-[15%] flex-grow">
                <nav className="flex flex-row justify-between mb-6">
                    <Button type="primary">
                        <Link href="/create-shipment" className="font-bold">
                            Criar envio
                        </Link>
                    </Button>
                    <Button type="text">
                        <Link href="/" className="font-bold">
                            Voltar
                        </Link>
                    </Button>
                </nav>
                <Table columns={columns} dataSource={shipments} rowKey="id" />
            </div>

            {/* Use the ShipmentDetails component */}
            <ShipmentDetails
                open={open}
                loading={loading}
                shipment={selectedShipment}
                onClose={() => setOpen(false)}
                onReload={() => showLoading(selectedShipment?.id || "")}
            />
        </div>
    );
}
