// Мы сразу достаем isLoading из объекта props
export const ScreenLoader = ({isLoading}: { isLoading: boolean }) => {

    return (
        <>
            {/* Если !isLoading === true, то рендерим div. Иначе ничего. */}
            {isLoading && (
                <div className={"flex justify-center items-center min-h-screen bg-gray-500"}>
                    <h1>Data Loading</h1>
                </div>
            )}
        </>
    )
}