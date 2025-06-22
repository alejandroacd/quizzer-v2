export const getLayoutClasses = (layout: string) => {
    switch (layout) {
        case "large":
            return "md:col-span-2 lg:row-span-2"
        case "wide":
            return "md:col-span-2"
        default:
            return ""
    }
}

export const getThemeColors = (categoryId: string) => {
    switch (categoryId) {
        case "sports":
            return {
                shadow: "group-hover:shadow-primary/15",
                border: "group-hover:border-primary/40",
                text: "group-hover:text-primary",
                button: "bg-primary hover:bg-primary/90",
                icon: "text-primary",
            }
        case "geography":
            return {
                shadow: "group-hover:shadow-secondary/20",
                border: "group-hover:border-secondary/40",
                text: "group-hover:text-secondary-foreground",
                button: "bg-secondary hover:bg-secondary/80",
                icon: "text-secondary-foreground",
            }
        case "history":
            return {
                shadow: "group-hover:shadow-accent/20",
                border: "group-hover:border-accent/40",
                text: "group-hover:text-accent-foreground",
                button: "bg-accent hover:bg-accent/90",
                icon: "text-accent-foreground",
            }
        case "arts":
            return {
                shadow: "group-hover:shadow-accent/20",
                border: "group-hover:border-accent/40",
                text: "group-hover:text-accent-foreground",
                button: "bg-accent hover:bg-accent/90",
                icon: "text-accent-foreground",
            }
        default:
            return {
                shadow: "group-hover:shadow-primary/15",
                border: "group-hover:border-primary/40",
                text: "group-hover:text-primary",
                button: "bg-primary hover:bg-primary/90",
                icon: "text-primary",
            }
    }
}

export const renderSpecialEffect = (effect: string) => {
    switch (effect) {
        case "ripple":
            return (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-secondary/20 rounded-full group-hover:w-32 group-hover:h-32 group-hover:-translate-x-16 group-hover:-translate-y-16 transition-all duration-700 ease-out"></div>
                </div>
            )
        case "spiral":
            return (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-accent/30 rounded-full -translate-x-4 -translate-y-4 group-hover:scale-[3] group-hover:rotate-180 transition-all duration-1000 ease-out"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 border border-primary/20 rounded-full -translate-x-2 -translate-y-2 group-hover:scale-[5] group-hover:-rotate-180 transition-all duration-1000 ease-out delay-100"></div>
                </div>
            )
        case "splash":
            return (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-2 right-8 w-3 h-3 bg-accent/40 rounded-full group-hover:scale-150 transition-all duration-500 delay-100"></div>
                    <div className="absolute top-6 right-4 w-2 h-2 bg-secondary/40 rounded-full group-hover:scale-200 transition-all duration-500 delay-200"></div>
                    <div className="absolute bottom-4 left-8 w-2 h-2 bg-primary/40 rounded-full group-hover:scale-150 transition-all duration-500 delay-300"></div>
                </div>
            )
        default:
            return null
    }
}

export const getIconAnimation = (categoryId: string) => {
    switch (categoryId) {
        case "geography":
            return "group-hover:rotate-180"
        case "history":
            return "group-hover:-rotate-45"
        case "arts":
            return "group-hover:rotate-12"
        default:
            return ""
    }
}