import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LostPasswordPage } from "./pages/LostPasswordPage";
import { ProtectedRoute } from "./components/ProtectedRoute"; // <--- 1. Импорт

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthPage />} />

                {/* 2. Оборачиваем Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/lost-password" element={<LostPasswordPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;