using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.queries
{
    public class ObtainPokemonByName
    {
        private readonly MongoDBService _mongoDBService;
        public ObtainPokemonByName(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public Pokemon handle(string name)
        {
            return _mongoDBService.GetPokeByName(name);
        }

    }
}
