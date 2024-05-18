using Backend.api.Controllers.DTO;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.commands
{
    public class UpdatePokemon
    {
        private readonly MongoDBService _mongoDBService;
        public UpdatePokemon(MongoDBService mongoDBService)
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
