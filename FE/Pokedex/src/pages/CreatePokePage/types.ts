import { genNameUrl, pokeMoves, pokemonAbilities, pokemonTypes, sprites } from "../../models/poke.models";

export type CreatePokeInput = {
    name: string;
    image: FileList | any;
    images_sprites: FileList | any;
    ability_1:string
    ability_2:string
    move_1:string
    move_2:string
    move_3:string
    type:string
};

export type PokemonType = {
	name:string;
	abilities:pokemonAbilities[];
	sprites:sprites;
	moves:pokeMoves[];
	types:pokemonTypes[];
}