
export const metadata = {
    title: 'Page Not Found',
    description: 'Page Not Found',
}

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh]">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-4">Sorry, we couldn&apos;t find this page :'(</p>
        </div>
    )
}