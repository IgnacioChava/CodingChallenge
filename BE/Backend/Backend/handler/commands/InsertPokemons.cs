using Backend.api.Controllers.DTO;
using Backend.repository;
using Backend.repository.Model;

namespace Backend.handler.commands
{
    public class InsertPokemons
    {
        private readonly MongoDBService _mongoDBService;
        public InsertPokemons(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public Task<List<Pokemon>> handle()
        {
            List<Pokemon> pokemons = new List<Pokemon>();
            for (int i = 1; i < 6; i++)
            {

                using (var client = new HttpClient())
                {
                    int number = 1;
                    string baseUrl = "https://pokeapi.co/api/v2/pokemon/" + i;

                    var request = new HttpRequestMessage(HttpMethod.Get, baseUrl);

                    // Solicitud HTTP
                    var responseTask = client.SendAsync(request);

                    responseTask.Wait();

                    var result = responseTask.Result;

                    PokemonDTO pokemonResult = new PokemonDTO();
                    if (result.IsSuccessStatusCode)
                    {
                        //var data = JsonConvert.DeserializeObject<Data>(result);
                        var readTask = result.Content.ReadFromJsonAsync<PokemonDTO>();
                        readTask.Wait();
                        pokemonResult = readTask.Result;


                        Pokemon pokemon = new Pokemon();
                        pokemon.abilities = pokemonResult.abilities;
                        pokemon.name = pokemonResult.name;
                        pokemon.sprites = pokemonResult.sprites;
                        pokemon.moves = pokemonResult.moves.Take(3).ToList();
                        pokemon.types = pokemonResult.types;
                        pokemon.is_uploaded = false;
                        pokemons.Add(pokemon);



                    }
                    else
                    {

                        
                    }


                }
            }

            foreach (var pokemon in pokemons)
            {
                var result = _mongoDBService.CreatePoke(pokemon);
            }
            return _mongoDBService.GetPoke();
        }
    }
}
