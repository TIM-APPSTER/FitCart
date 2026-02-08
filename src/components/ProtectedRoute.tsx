import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; // Это наш "пинок" на другую страницу
import { supabase } from "../lib/supabase";
import { ScreenLoader } from "./ScreenLoader"; // Твой красивый лоадер

// Мы принимаем "children" — это то, что мы охраняем (например, Dashboard)
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // 1. Спрашиваем у базы: "Есть кто дома?"
        supabase.auth.getSession().then(({ data: { session } }) => {
            // !!session превращает объект в true (если есть) или false (если null)
            setIsAuthenticated(!!session);
        });
    }, []);

    // 2. ВАЖНО: Пока мы не знаем ответ (null), мы ОБЯЗАНЫ ждать.
    // Иначе охранник может случайно выгнать человека, пока база просто тупит.
    if (isAuthenticated === null) {
        return <ScreenLoader />;
    }

    // 3. Если ответ "НЕТ" (false) — выгоняем на главную страницу ("/")
    // replace={true} стирает историю, чтобы кнопка "Назад" не возвращала сюда
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 4. Если ответ "ДА" — открываем дверь и показываем защищенный контент
    return children;
};