import type { FlowerDto } from "./flower.dto"
import type { FlowerColorDto } from "./flower-color.dto"
import type { DefaultColorsDto } from "./default-colors.dto"

export interface ResultSimulatorFlowersDto {
    title: string,
    flower1?: FlowerDto,
    flower2?: FlowerDto,
    color1?: FlowerColorDto,
    color2?: FlowerColorDto,
    resultFlower?: FlowerDto,
    resultColor?: DefaultColorsDto,
    error?: string,
    howObtainColor?: string
}

