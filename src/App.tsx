import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Если путь "/", показываем страницу авторизации */}
                <Route path="/" element={<AuthPage />} />

                {/* Если путь "/dashboard", показываем дашборд */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;