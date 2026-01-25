import {supabase} from "@/lib/supabase.ts";
import {useState, useEffect} from "react";
import {ScreenLoader} from "@/components/ScreenLoader.tsx";

export const Dashboard = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        const getUserEmail = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            if (user) {
                // Ошибка тут: нужно писать user.email, так как 'data' мы уже разобрали
                setUserEmail(user.email ?? "");
            }
            setisLoading(false);
        }

        // ЗАПУСКАЕМ ФУНКЦИЮ:
        getUserEmail();
    }, [])
    return (
        <>{isLoading ? (ScreenLoader({isLoading})) : <div className={"p-4"}>
            <h1>Тут будет рацион</h1>
            <h2>Hello, {userEmail}</h2>
        </div>}

        </>
    )
}