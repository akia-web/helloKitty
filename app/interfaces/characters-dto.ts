import type { Visitor } from "~/generated/prisma/client";
import type { ItemDto } from "./item.dto";

export interface CharacterDto {
    name: string;
    level: number;
    image: string;
    miniature: string;
    favoriteGift: ItemDto;
    receivedGift: ItemDto;
    bonus1: string;
    bonus2: string;
    visitors: Visitor[];
    id?: number
}