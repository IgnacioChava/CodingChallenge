using Backend.Interface;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.queries
{
    public class ObtainPokemonsTest
    {
        private readonly IMongoDBService _mongoDBService;
        public ObtainPokemonsTest(IMongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<List<Pokemon>> handle()
        {
            return await _mongoDBService.GetPoke();
        }
    }
}
