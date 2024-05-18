using Backend.repository.Model;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.api.Controllers.DTO
{
    public class PokemonDTO
    {

    
        public string name { get; set; }

       
        public List<Abilities> abilities { get; set; }

   
        public Sprites sprites { get; set; }
 
        public List<Moves> moves { get; set; }
    
        public List<Types> types { get; set; }


    }
}
