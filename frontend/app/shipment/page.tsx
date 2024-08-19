"use client";

import CardComponent from "@/components/CardComponent/page";

const cardData = [
    { title: "Envios", description: "Gerenciador de envios", link: "/manage-shipments", link_title: "Gerenciar" },
];

export default function Shipment() {
    return (
        <div className="py-10 px-[15%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardData.map((card, index) => (
                <CardComponent
                    key={index}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                    link_title={card.link_title}
                />
            ))}
        </div>
    );
}
