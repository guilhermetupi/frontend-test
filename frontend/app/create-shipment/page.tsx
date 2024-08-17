"use client";

import MainHeader from "@/components/MainHeader/page";
import { Button, List, Select, message } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAllProducts } from "@/actions/products";
import { createShipment } from "@/actions/shipments";

type Product = { id: string; name: string };
type ProductOption = { label: string; value: string; item: Product };

export default function CreateShipment() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productList, setProductList] = useState<Product[]>([]);
    const [options, setOptions] = useState<ProductOption[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchAllProducts();
            setOptions(data);
            setAllProducts(data.map((item: ProductOption) => ({ id: item.value, name: item.label })));
        };

        loadProducts();
    }, []);

    const handleSelectChange = (value: string, option: any) => {
        setSelectedProduct(option.item);
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const updatedProductList = [...productList, selectedProduct];
            setProductList(updatedProductList);
            setSelectedProduct(null);
    
            console.log("Updated product list:", updatedProductList);
        }
    };
    

    const handleRemoveProduct = (index: number) => {
        setProductList(productList.filter((_, i) => i !== index));
    };

    const handleCreateShipment = async () => {

        const uniqueProductIds = productList
            .map(item => item.id)
            .filter((id, index, self) => self.indexOf(id) === index);
        
        const shipmentData = {
            products: uniqueProductIds,
        };
    
        try {
            const result = await createShipment(shipmentData);
    
            if (result && result.error) {
                throw new Error(result.error);
            }
    
            setProductList([]);
            setSelectedProduct(null);
            message.success('Envio criado com sucesso!');
    
            console.log("Shipment data:", shipmentData);
            console.log("Shipment result:", result);
    
        } catch (error) {
            console.error('Failed to create shipment:', error);
            message.error('Falha ao criar envio.');
        }
    };
    

    return (
        <div className="flex flex-col h-screen">
            <MainHeader />
            <div className="py-10 px-[15%] flex flex-col justify-start">
                <Button type="text" className="mb-3 w-[10%]">
                    <Link 
                        href="/manage-shipments" 
                        className="font-bold"
                    >
                        Voltar
                    </Link>
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
                <div className="mt-5 h-[60dvh]">
                    <List
                        header="Lista de produtos"
                        bordered
                        dataSource={productList}
                        pagination={{
                            pageSize: 10,
                            align: "end",
                            position: "top",
                        }}
                        renderItem={(item, index) => (
                            <div className="flex flex-row justify-between">
                                <List.Item key={index}>
                                    {item.name}
                                </List.Item>
                                <Button
                                    size="large"
                                    danger 
                                    onClick={() => handleRemoveProduct(index)}
                                >
                                    Remover
                                </Button>
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-row justify-end mt-3">
                    <Button
                        className="w-[10%]" 
                        type="primary" 
                        disabled={productList.length === 0}
                        onClick={handleCreateShipment}
                    >
                        Criar envio
                    </Button>
                </div>
            </div>
        </div>
    );
}
