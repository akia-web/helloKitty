import type { VisitorDto } from "./visitor.dto";

export interface VisitorUserDto {
    isResident: boolean;
    isFav: boolean;
    visitor: VisitorDto
}