import { SwitchThemeToggle } from "../switch-toggle-theme";
export const Header = () => {
    return <header className="md:w-3/4 md:mx-auto h-16 p-5 my-4  flex flex-row items-center justify-between">
        <h1 className="font-bold tracking-tighter text-5xl">Quizzer</h1>
        <SwitchThemeToggle />
    </header>
}