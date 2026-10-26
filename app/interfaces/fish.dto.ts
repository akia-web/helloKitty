import type { RarityEnum } from "~/enum/rarityEnum";
import type { WeatherReportEnum } from "~/enum/weatherReportEnum";
import type { RegionDto } from "./region.dto";
import type { ItemDto } from "./item.dto";

export interface FishDto {
    id?: number;
    name: string;
    image: string;
    rarity: RarityEnum;
    weatherReport: string[];
    url: string;
    description: string;
    tinyDescription: string;
    regularDescription: string;
    hugeDescription: string;
    region: RegionDto;
    bait1?: ItemDto;
    bait2?: ItemDto
}