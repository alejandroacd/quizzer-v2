"use client"

import { categories } from "@/configs/categories"
import { CategoryCard } from "@/components/category-card"
import ColourfulText from "@/components/colorful-text"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="min-h-[90vh] px-6 pb-20 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center pt-12 pb-14 sm:pt-16 sm:pb-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Test your knowledge</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance mb-4"
          >
            Welcome to <ColourfulText text="Quizzer" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl"
          >
            Challenge yourself across multiple categories. Pick a topic, set your pace, and see how much you really know.
          </motion.p>
        </section>

        {/* Category Grid — asymmetric bento: wide + narrow alternating */}
        <section className="grid grid-cols-12 gap-4">
          {categories.map((category, index) => {
            // Sports (0) and Arts (3) are featured/wider; Geography (1) and History (2) are narrower
            const featured = index === 0 || index === 3
            return (
              <div
                key={category.id}
                className={cn(
                  "col-span-12",
                  featured ? "md:col-span-7" : "md:col-span-5"
                )}
              >
                <CategoryCard
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  questionCount={category.questionCount}
                  difficulty={category.difficulty}
                  index={index}
                  featured={featured}
                />
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}
