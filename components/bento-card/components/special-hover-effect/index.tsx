import { renderSpecialEffect } from "@/components/bento-grid/utils"
export const RenderSpecialEffect = ({specialEffect}: {specialEffect: string}) => {
    return <>
                    {specialEffect && renderSpecialEffect(specialEffect)}
</>
}