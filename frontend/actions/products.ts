"use server";

let url = process.env.API_URL;

export const fetchAllProducts = async () => {
    try {
        const response = await fetch(url + `/products`, {
            cache: 'no-cache',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.map((item: { id: string, name: string }) => ({
            label: item.name,
            value: item.id,
            item: item,
        }));
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
};
