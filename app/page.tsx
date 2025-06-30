import BentoGrid from "@/components/bento-grid";
import ColourfulText from "@/components/colorful-text";
export default function Home() {
  return (
    <main className="items-center justify-items-center min-h-[90vh] p-8 pb-20  gap-16  sm:p-20">
      <div className="row-start-2 flex flex-col gap-12">
        <h1 className="scroll-m-20 text-center text-4xl  font-extrabold tracking-tight text-balance">
          Welcome to <ColourfulText text="Quizzer" />
          <br />
          All your quizzes in one place
        </h1>
        <BentoGrid />
      </div>

    </main>
  );
}
