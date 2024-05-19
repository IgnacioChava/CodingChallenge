using Backend.repository.Model;

namespace Backend.Interface
{
    public interface IMongoDBService
    {
        Pokemon CreatePoke(Pokemon poke);

        public Task<List<Pokemon>> GetPoke();

        public void DeletePokemon(string name);

        public void UpdatePokemon(Pokemon pokemon);

    }
}
