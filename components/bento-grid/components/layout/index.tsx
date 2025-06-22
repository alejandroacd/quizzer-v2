export const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-background pt-3 relative overflow-hidden">
        <div className="max-w-6xl  mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {children}
            </div>
        </div>
    </div>
}