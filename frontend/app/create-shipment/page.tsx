"use client";

import MainHeader from "@/components/MainHeader/page";
import { Button, List, Select } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CreateShipment() {
    const [selectedProduct, setSelectedProduct] = useState<{ id: string, name: string } | null>(null);
    const [productList, setProductList] = useState<{ id: string, name: string, uniqueId: number }[]>([]);
    const [options, setOptions] = useState<{ label: string, value: string, item: { id: string, name: string } }[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/products');
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
    
                setOptions(data.map((item: { id: string, name: string }) => ({
                    label: item.name,
                    value: item.id,
                    item: item,
                })));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSelectChange = (value: string, option: any) => {
        setSelectedProduct(option.item);
    };

    const generateUniqueId = (): number => {
        let uniqueId: number;
        do {
            uniqueId = Math.floor(Math.random() * 1000000);
        } while (productList.some(item => item.uniqueId === uniqueId));
        return uniqueId;
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const newProduct = { ...selectedProduct, uniqueId: generateUniqueId() };
            setProductList([...productList, newProduct]);
            setSelectedProduct(null);
        }

        console.log(productList);
    };

    const handleRemoveProduct = (uniqueId: number) => {
        setProductList(productList.filter((item) => item.uniqueId !== uniqueId));

        console.log(productList);
    };

    return (
        <div className="flex flex-col h-screen">
            <MainHeader />
            <div className="py-10 px-[15%] flex-grow">
                <Button type="text" className="mb-3">
                    <Link href="/manage-shipments" className="font-bold">Voltar</Link>
                </Button>
                <div className="flex flex-row justify-between">
                    <Select
                        defaultValue=""
                        options={options}
                        className="w-[90%]"
                        onChange={handleSelectChange}
                        value={selectedProduct?.id || ""}
                    />
                    <Button 
                        type="primary" 
                        onClick={handleAddProduct}
                        disabled={!selectedProduct}
                        >
                        Adicionar
                    </Button>
                </div>
                <div className="mt-5">
                    <List
                        header="Lista de produtos"
                        className=""
                        bordered
                        dataSource={productList}
                        pagination={{
                            pageSize: 10,
                            align: "end",
                            position: "top",
                          }}
                        renderItem={(item) => (
                            <div className="flex flex-row justify-between">
                                <List.Item 
                                    className="w-[100%]"
                                    key={item.uniqueId}>
                                    {item.name}
                                </List.Item>
                                <Button
                                    size="large"
                                    className=""
                                    danger 
                                    onClick={() => handleRemoveProduct(item.uniqueId)}>

                                    Remover
                                </Button>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
