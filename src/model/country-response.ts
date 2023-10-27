import { Continent } from "./enums/Continent";
import { Region } from "./enums/Region";

export interface Country {
    name: Name;
    capital?: string[];
    area: number;
    region: Region;
    subregion?: string;
    languages?: { [key: string]: string };
    latlng: number[];
    maps: Maps;
    population: number;
    continents: Continent[];
    flags: Flags;
    coatOfArms: CoatOfArms;
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt?: string;
}

export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

export interface Name {
    common: string;
    official: string;
}
