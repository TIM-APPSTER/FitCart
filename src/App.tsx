import { useState } from "react"; // 1. Нам нужен стейт для инпута
import { Button } from "@/components/ui/button";
import { fetchProductData } from "./fetchProductData.tsx"; // Предполагаем, что тут уже есть parseNutrients
import { useSilpoSearch } from "@/useSilpoSearch.tsx";

function App() {
    const { products, searchProducts, loading } = useSilpoSearch();
    const [query, setQuery] = useState(""); // Храним текст поиска

    // Обработчик отправки формы
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Чтобы страница не перезагружалась
        searchProducts(query); // Передаем ИМЕННО текст
    };

    // Обработчик клика по товару (чтобы узнать БЖУ)
    const handleProductClick = async (slug: string) => {
        console.log("Считаем калории...");
        const details = await fetchProductData(slug);
        console.log("БЖУ товара:", details);
        alert(`Калории: ${details.calories}`); // Пока просто покажем в алерте
    };

    return (
        <div className="flex min-h-svh flex-col items-center p-10 gap-6">
            <h1 className="text-2xl font-bold">FitCart 🛒</h1>

            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    className="border p-2 rounded"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Связываем инпут со стейтом
                    placeholder="Например: Гречка"
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Ищем..." : "Search"}
                </Button>
            </form>

            <div className="w-full max-w-md">
                <ul className="flex flex-col gap-4">
                    {products.map((product: any) => (
                        <li key={product.id} className="border p-4 rounded shadow flex justify-between items-center">
                            <div>
                                {/* ВАЖНО: Рендерим конкретные поля, а не весь объект */}
                                <p className="font-bold">{product.title}</p>
                                <p className="text-sm text-gray-500">{product.displayPrice} грн</p>
                            </div>

                            <Button variant="outline" onClick={() => handleProductClick(product.slug)}>
                                + Добавить
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;