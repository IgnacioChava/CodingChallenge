using Backend.api.Controllers.DTO;
using Backend.Interface;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.commands
{
    public class CreatePokemonTest
    {
        private readonly IMongoDBService _mongoDBService;

        public CreatePokemonTest(IMongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService ?? throw new ArgumentNullException(nameof(mongoDBService));
        }

        public string handle(PokemonDTO poke)
        {
            Pokemon pokemon = new Pokemon();
            pokemon.abilities = poke.abilities;
            pokemon.name = poke.name;
            pokemon.sprites = poke.sprites;
            pokemon.moves = poke.moves;
            pokemon.types = poke.types;
            pokemon.is_uploaded = true;


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
