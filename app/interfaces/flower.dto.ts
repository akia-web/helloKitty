import type { DefaultColor } from "~/generated/prisma/client";
import type { DefaultColorsDto } from "./default-colors.dto";
import type { FlowerMotifEnum } from "~/enum/flowerMotifEnum";

export interface FlowerDto {
    id?: string;
    name: string;
    image: string;
    defaultMotif: FlowerMotifEnum
    defaultColors: DefaultColorsDto[]
}