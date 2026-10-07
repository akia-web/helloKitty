import type { FlowerColorTypeEnum } from "~/enum/flowerColorTypeEnum";

export interface DefaultColorsDto {
    id?: number;
    name: string;
    color: string;
    colorType: FlowerColorTypeEnum;
    checked?: boolean
}