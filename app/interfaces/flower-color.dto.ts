import type { FlowerMotifEnum } from "~/enum/flowerMotifEnum"
import type { DefaultColorsDto } from "./default-colors.dto"
import type { FlowerUserDto } from "./flower-user.dto";

export interface FlowerColorDto {
    id?: number;
    motif: FlowerMotifEnum
    color1: DefaultColorsDto
    color2?: DefaultColorsDto
    checked?: boolean
    flowerUser?: FlowerUserDto
}