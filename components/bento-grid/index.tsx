"use client"

import { getThemeColors } from "./utils"
import { categories } from "@/configs/categories"
import { Layout } from "./components/layout"
import { BentoCard } from "../bento-card"

export default function BentoGrid() {

    return <Layout>
        {categories.map((category) => {
            const themeColors = getThemeColors(category.id)
            const IconComponent = category.icon
            return <BentoCard key={category.id} category={category} themeColors={themeColors} IconComponent={IconComponent} />
        })}
    </Layout>
}
