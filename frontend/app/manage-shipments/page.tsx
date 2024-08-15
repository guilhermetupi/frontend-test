import MainHeader from "@/components/MainHeader/page";
import { Button, Table } from "antd";
import Link from "next/link";

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
    },
    {
        title: "Última atualização",
        dataIndex: "lastUpdate",
        key: "lastUpdate",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Ações",
        dataIndex: "actions",
        key: "actions",
    },
];

export default async function ManageShipments() {
        const response = await fetch('http://localhost:4000/shipments');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        return (
            <div className="flex flex-col h-screen">
                <MainHeader />
                <div className="py-10 px-[15%] flex-grow">
                    <nav className="flex flex-row justify-between mb-6">
                        <Button type="primary">Criar envio</Button>
                        <Button type="text">
                            <Link href="/" className="font-bold">Voltar</Link>
                        </Button>
                    </nav>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
}
