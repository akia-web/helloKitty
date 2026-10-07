import type { DefaultColorsDto } from "./default-colors.dto";
import type { FlowerColorDto } from "./flower-color.dto";
import type { FlowerDto } from "./flower.dto";

export interface FlowerUserDto {
    flower: FlowerDto;
    colors: FlowerColorDto[]
}