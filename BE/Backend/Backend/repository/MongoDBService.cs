using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Linq;
using Backend.repository.Model;
using static MongoDB.Driver.WriteConcern;

namespace Backend.repository
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Pokemon> _pokemonCollection;
        
        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _pokemonCollection = database.GetCollection<Pokemon>(mongoDBSettings.Value.CollectionName);
            

        }


        public Pokemon CreatePoke(Pokemon poke)
        {
            _pokemonCollection.InsertOneAsync(poke);
            return poke;

        }

        public async Task<List<Pokemon>> GetPoke()
        {

            return await _pokemonCollection.Find(poke => true).Limit(25).ToListAsync();
        }

        public void DeletePokemon(string name)
        {
            _pokemonCollection.DeleteOne(poke => poke.name == name);
        }

        public void UpdatePokemon(Pokemon pokemon)
        {

            var filter = Builders<Pokemon>.Filter
            .Eq(poke => poke.Id, pokemon.Id);

            var oldPoke = _pokemonCollection.Find(filter).First();
            var oldId = oldPoke.Id;
            
            pokemon.Id = oldId;

            
            _pokemonCollection.ReplaceOne(filter, pokemon);
        }

    }
}
