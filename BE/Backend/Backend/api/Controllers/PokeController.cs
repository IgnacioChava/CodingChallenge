using Backend.api.Controllers.DTO;
using Backend.repository;
using Backend.repository.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using static System.Net.WebRequestMethods;

namespace Backend.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokeController : ControllerBase
    {

        private readonly MongoDBService _mongoDBService;
        public PokeController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        /*
        private readonly CreatePokemon _handleCreate;
        private readonly GetPokemon _handleGet;

        public PokeController(CreatePokemon handleCreate, GetPokemon handleGet)
        {
            _handleCreate = handleCreate;
            _handleGet = handleGet;
        }*/
        [Route("InsertPokemons")]
        [HttpPost]
        public ActionResult InsertPokemons()
        {

            List<Pokemon> pokemons = new List<Pokemon>();
            for(int i=1; i<6; i++) { 
            
                using (var client = new HttpClient())
                {
                    int number = 1;
                    string baseUrl = "https://pokeapi.co/api/v2/pokemon/"+i;

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
                        pokemons.Add(pokemon);
                       
                        

                    }
                    else
                    {
                    
                        return BadRequest();
                    }


                }
            }

            foreach (var pokemon in pokemons)
            {
                var result = _mongoDBService.CreatePoke(pokemon);
            }
            return Ok(pokemons);

    }

        [HttpPost]
        public ActionResult CreatePokemon([FromBody] PokemonDTO poke)
        {
            Pokemon pokemon = new Pokemon();
            pokemon.abilities = poke.abilities;
            pokemon.name = poke.name;
            pokemon.sprites = poke.sprites;
            pokemon.moves = poke.moves;
            pokemon.types = poke.types;


            var result = _mongoDBService.CreatePoke(pokemon);

            if (result == null) {
                return BadRequest(result);
            }
            else
            {
                return Ok(result);
            }
            
        }
        
        // GET: PokeController
        [HttpGet]
        public async Task<ActionResult> GetPokemon()
        {
            List<Pokemon> result = await _mongoDBService.GetPoke();
           
            return Ok(result);
        }

        [Route("deletePoke/{name}")]
        [HttpDelete]
        public ActionResult DeletePokemon(string name)
        {
            try
            {
                _mongoDBService.DeletePokemon(name);

                return Ok("OK");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }


        [HttpPut]
        public ActionResult UpdatePokemon(Pokemon poke)
        {
            try
            {

                _mongoDBService.UpdatePokemon(poke);
                return Ok("OK");
            }
            catch(Exception e)
            {
                return BadRequest();
            }
            
        }




        /*
        // GET: PokeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        /*
        // GET: PokeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PokeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PokeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PokeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PokeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PokeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        */
    }
}
