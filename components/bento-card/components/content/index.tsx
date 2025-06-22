import { CardContent } from "@/components/ui/card"
export const Content = ({description}: {description: string}) => {
    return  <CardContent className={`relative  p-0 h-full flex flex-col `}>

        <p className="leading-relaxed text-start [&:not(:first-child)]:mt-6">
            {description}
        </p>
    </CardContent>
}