
export type Login = {
	username: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};
export type PokemonUpdate = {
	id:string;
	name:string;
	abilities:pokemonAbilities[];
	sprites:sprites;
	moves:pokeMoves[];
	types:pokemonTypes[];
	is_uploaded:boolean;
} 
export type PokemonCreate = {
	name:string;
	abilities:pokemonAbilities[];
	sprites:sprites;
	moves:pokeMoves[];
	types:pokemonTypes[];
} 
export type Pokemon = {
	id:string;
	name:string;
	abilities:pokemonAbilities[];
	sprites:sprites;
	moves:pokeMoves[];
	types:pokemonTypes[];
	is_uploaded:boolean;
}
export type pokemonAbilities = {
	ability:genNameUrl;
	is_hidden:boolean;
	slot:number;
}
export type genNameUrl = {
	name:string;
	url:string;
}

export type sprites = {
	back_default:string | null;
	front_default:string | null;
	other:other_sprite;
}
export type other_sprite = {
	home:other_sprite_home
}
export type other_sprite_home = {
	front_default:string | null
}

export type pokeMoves = {
	move:genNameUrl
}

export type pokemonTypes = {
	type:genNameUrl;
	slot:number;
}


