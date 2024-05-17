using Backend.repository;

namespace Backend.handler.commands
{
    public class DeletePokemon
    {
        private readonly MongoDBService _mongoDBService;
        public DeletePokemon(MongoDBService mongoDBService)
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
