import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
// Заметь: ScreenLoader и Navigate тут больше не нужны!

export const Dashboard = () => {
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const getUserEmail = async () => {
            // Мы просто берем данные, зная, что юзер точно есть
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email ?? "");
            }
        };
        getUserEmail();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Панель управления</h1>
            <h2>Привет, {userEmail} 👋</h2>
            <p className="mt-4">Тут будет твой рацион...</p>
        </div>
    );
};