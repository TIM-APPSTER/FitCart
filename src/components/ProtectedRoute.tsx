import { useEffect, useState } from "react";
import {data, Navigate} from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ScreenLoader } from "./ScreenLoader";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // Состояние авторизации (null = еще не знаем, true/false = узнали)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // Новое состояние: нужно ли держать лоадер в DOM-дереве?
    const [showLoaderDOM, setShowLoaderDOM] = useState(true);

    // Новое состояние: виден ли лоадер визуально (opacity)?
    const [isLoaderVisible, setIsLoaderVisible] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            // Твоя искусственная задержка (чтобы успеть увидеть начало)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const { data: { session } } = await supabase.auth.getSession();
            console.log("1")
            setIsAuthenticated(!!session);
            console.log("2")
            console.log(setIsLoaderVisible);
            // Как только узнали статус -> начинаем анимацию исчезновения
            setIsLoaderVisible(false);
            console.log("3")
            // Ждем 1 секунду (как в duration-1000), пока он растворится
            setTimeout(() => {
                setShowLoaderDOM(false); // Теперь удаляем его полностью
            }, 1000);
        };

        checkSession();
    }, []);

    // 1. Если не авторизован (и уже точно знаем это) -> редирект сразу
    if (isAuthenticated === false) {
        return <Navigate to="/" replace />;
    }

    // 2. Магия наложения:
    // Мы возвращаем children (Дашборд), НО если лоадер еще нужен (showLoaderDOM),
    // мы рендерим его ПОВЕРХ детей.
    return (
        <>
            {/* Показываем контент (он будет под лоадером, пока тот не исчезнет) */}
            {isAuthenticated && children}

            {/* Лоадер висит поверх всего, пока showLoaderDOM = true */}
            {showLoaderDOM && <ScreenLoader visible={isLoaderVisible} />}
        </>
    );
};