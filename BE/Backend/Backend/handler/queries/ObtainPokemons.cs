using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.queries
{
    public class ObtainPokemons
    {
        private readonly MongoDBService _mongoDBService;
        public ObtainPokemons(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<List<Pokemon>> handle()
        {
            return await _mongoDBService.GetPoke();
        }
    }
}
