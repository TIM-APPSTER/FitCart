// Функция для получения данных о продукте
export const fetchProductData = async (productSlug: any) => {
    // Базовый URL (можно вынести в конфиг)
    // Обрати внимание: я оставил нули в ID магазина, так как для БЖУ этого достаточно
    const url = `https://sf-ecom-api.silpo.ua/v1/uk/branches/00000000-0000-0000-0000-000000000000/products/${productSlug}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Origin' и 'Referer' браузер подставит сам, но иногда нужны обходные пути (Proxy),
                // если возникнет ошибка CORS. Пока пробуем напрямую.
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные продукта:", data);
        return data;

    } catch (error) {
        console.error("Не удалось загрузить товар:", error);
    }
};

// Пример вызова (например, в useEffect)
// fetchProductData('avokado-khass-styglyi-838137');