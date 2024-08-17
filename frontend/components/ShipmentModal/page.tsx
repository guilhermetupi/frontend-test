import React from "react";
import { Button, Modal } from "antd";


interface Product {
    id: string;
    name: string;
}

interface ShipmentDetailsProps {
    open: boolean;
    loading: boolean;
    shipment: {
        id: string;  // Make sure you include the shipment ID here
        shipmentNumber: string;
        sendDate: Date;
        lastUpdate: Date;
        status: string;
        products: Product[];
    } | null;
    onClose: () => void;
    onReload: () => void;
}

export default function ShipmentDetails({ open, loading, shipment, onClose, onReload }: ShipmentDetailsProps) {

    return (
        <Modal
            title={<p className="font-bold">Remessa {shipment?.shipmentNumber}</p>}
            footer={
                <div className="flex flex-row justify-end gap-1">
                    <Button type="primary">
                        Confirmar entrega
                    </Button>
                    <Button danger>
                        Cancelar entrega
                    </Button>
                </div>
            }
            open={open}
            onCancel={onClose}
        >
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="flex flex-col w-[100%]">
                    <p className="py-2">Produtos</p>
                    <ul className="flex flex-col list-disc pl-5 gap-1">
                        {shipment?.products?.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Modal>
    );
}
