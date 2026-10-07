import type { CharacterDto } from "./characters-dto";
import type { ItemDto } from "./item.dto";

export interface VisitorDto {
    name: string;
    image: string;
    gift: ItemDto;
    id?: number;
    character: CharacterDto
}