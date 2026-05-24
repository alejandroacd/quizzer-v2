import { GoBackButton } from "@/components/go-back";

export default function Layout  ({ children }: { children: React.ReactNode }) {
    return <div className="min-h-[90vh]  p-3 md:p-0 flex justify-center  flex-col ">
        <GoBackButton variant="minimal" text="Back"/>
        {children}
        </div>
}