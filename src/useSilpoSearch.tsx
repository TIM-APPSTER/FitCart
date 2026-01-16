import { useState } from 'react';

// ID магазина (можно использовать реальный или нули)
const BRANCH_ID = "00000000-0000-0000-0000-000000000000";

export const useSilpoSearch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchProducts = async (query: any) => {
        if (!query) return;
        setLoading(true);

        try {
            // 1. Кодируем русский текст (Мясо -> %D0%BC%D1%8F%D1%81%D0%BE)
            const encodedQuery = encodeURIComponent(query);

            // 2. Собираем URL (минимально необходимый)
            const url = `https://sf-ecom-api.silpo.ua/v1/uk/branches/${BRANCH_ID}/products?limit=20&deliveryType=DeliveryHome&includeChildCategories=true&search=${encodedQuery}`;

            const response = await fetch(url);

            if (!response.ok) throw new Error('Ошибка сети');

            const data = await response.json();

            // 3. Сохраняем товары (обычно они лежат в data.items)
            setProducts(data.items || []);

        } catch (error) {
            console.error("Не удалось найти товары:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return { products, searchProducts, loading };
};