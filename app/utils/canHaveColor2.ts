import { FlowerMotifEnum } from "~/enum/flowerMotifEnum"

export const canHaveColor2 = (value: string) => {
    return value === FlowerMotifEnum.OMBRE || value === FlowerMotifEnum.BORD ||
        value === FlowerMotifEnum.TACHETE || value === FlowerMotifEnum.ALTERNATIF ||
        value === FlowerMotifEnum.RAYE || value === FlowerMotifEnum.FRAGMENTE ||
        value === FlowerMotifEnum.ANNEAU || value === FlowerMotifEnum.CONFETTI
}