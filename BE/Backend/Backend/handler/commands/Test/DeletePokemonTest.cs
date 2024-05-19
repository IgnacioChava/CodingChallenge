using Backend.Interface;
using Backend.repository;

namespace Backend.handler.commands
{
    public class DeletePokemonTest
    {
        private readonly IMongoDBService _mongoDBService;
        public DeletePokemonTest(IMongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public string handle(string name)
        {
            try
            {
                _mongoDBService.DeletePokemon(name);
                return "OK";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
