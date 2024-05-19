using Backend.api.Controllers.DTO;
using Backend.Interface;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.commands
{
    public class UpdatePokemonTest
    {
        private readonly IMongoDBService _mongoDBService;
        public UpdatePokemonTest(IMongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public string handle(Pokemon poke)
        {
            try
            {

                _mongoDBService.UpdatePokemon(poke);
                return "OK";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

    }
}
