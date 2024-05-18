using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Linq;
using Backend.repository.Model;
using static MongoDB.Driver.WriteConcern;
using DnsClient;

namespace Backend.repository
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Pokemon> _pokemonCollection;
        private readonly IMongoCollection<Login> _loginCollection;
        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _pokemonCollection = database.GetCollection<Pokemon>(mongoDBSettings.Value.CollectionName);
            _loginCollection = database.GetCollection<Login>(mongoDBSettings.Value.CollectionName2);

        }
        public Login CreateUser(Login user)
        {

            _loginCollection.InsertOneAsync(user);
            return user;

        }
        public async Task<Login> getUserAsync(string username)
        {
            return await _loginCollection.Find(user => user.Username == username).FirstAsync();
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

        public Pokemon GetPokeByName(string name)
        {
            var filter = Builders<Pokemon>.Filter
            .Eq(poke => poke.name, name);

            return _pokemonCollection.Find(filter).First();
        }

        public void DeletePokemon(string name)
        {
            _pokemonCollection.DeleteOne(poke => poke.name == name);
        }

        public void UpdatePokemon(Pokemon pokemon)
        {

            var filter = Builders<Pokemon>.Filter
            .Eq(poke => poke.name, pokemon.name);

            var oldPoke = _pokemonCollection.Find(filter).First();
            var oldId = oldPoke.Id;
            
            pokemon.Id = oldId;

            
            _pokemonCollection.ReplaceOne(filter, pokemon);
        }

    }
}
