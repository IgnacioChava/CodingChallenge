using Backend.api.Controllers.DTO;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.commands
{
    public class CreatePokemon
    {
        private readonly MongoDBService _mongoDBService;
        public CreatePokemon(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public string handle(PokemonDTO poke)
        {
            Pokemon pokemon = new Pokemon();
            pokemon.abilities = poke.abilities;
            pokemon.name = poke.name;
            pokemon.sprites = poke.sprites;
            pokemon.moves = poke.moves;
            pokemon.types = poke.types;


            var result = _mongoDBService.CreatePoke(pokemon);

            if (result == null)
            {
                return "NOT";
            }
            else
            {
                return "OK";
            }
        }
    }
}
