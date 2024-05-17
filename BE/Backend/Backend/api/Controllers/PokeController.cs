using Backend.api.Controllers.DTO;
using Backend.handler.commands;
using Backend.handler.queries;
using Backend.repository;
using Backend.repository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using static System.Net.WebRequestMethods;

namespace Backend.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "User")]
    public class PokeController : ControllerBase
    {

        private readonly InsertPokemons _insertPokemons;
        private readonly ObtainPokemons _obtainPokemons;
        private readonly ObtainPokemonByName _obtainPokemonByName;
        private readonly CreatePokemon _createPokemon;
        private readonly DeletePokemon _deletePokemon;
        private readonly UpdatePokemon _updatePokemon;
        
        public PokeController(ObtainPokemons obtainPokemons, CreatePokemon createPokemon, InsertPokemons insertPokemons, ObtainPokemonByName obtainPokemonByName, DeletePokemon deletePokemon, UpdatePokemon updatePokemon)
        {
            _obtainPokemons = obtainPokemons;
            _createPokemon = createPokemon;
            _insertPokemons = insertPokemons;
            _obtainPokemonByName = obtainPokemonByName;
            _deletePokemon = deletePokemon;
            _updatePokemon = updatePokemon;
        }

        [Route("InsertPokemons")]
        [HttpPost]
        public async Task<ActionResult> InsertPokemons()
        {
            List<Pokemon> result = await _insertPokemons.handle();
            return Ok(result);
        }

        [HttpPost]
        public ActionResult CreatePokemon([FromBody] PokemonDTO poke)
        {
            

            var result = _createPokemon.handle(poke);

            if (result != "OK") {
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
            List<Pokemon> result = await _obtainPokemons.handle();
           
            return Ok(result);
        }

        [Route("{name}")]
        [HttpGet]
        public ActionResult GetPokemonByName(string name)
        {
            Pokemon result = _obtainPokemonByName.handle(name);

            return Ok(result);
        }

        [Route("deletePoke/{name}")]
        [HttpDelete]
        public ActionResult DeletePokemon(string name)
        {
            try
            {
                string result = _deletePokemon.handle(name);

                if (result != "OK")
                {
                    return BadRequest(result);
                }
                else
                {
                    return Ok("OK");
                }
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

                string result = _updatePokemon.handle(poke);
                if (result != "OK")
                {
                    return BadRequest(result);
                }
                else
                {
                    return Ok("OK");
                }
            }
            catch(Exception e)
            {
                return BadRequest();
            }
            
        }
    }
}
