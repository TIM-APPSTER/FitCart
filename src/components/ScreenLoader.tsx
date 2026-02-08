// Добавляем проп visible, чтобы управлять прозрачностью
export const ScreenLoader = ({ visible }: { visible: boolean }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-500 transition-opacity duration-1000 ${
                visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <h1 className="text-white text-2xl animate-pulse">Data Loading...</h1>
        </div>
    )
}