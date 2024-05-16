using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Backend.repository.Model
{
    public class Pokemon
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string name { get; set; }

        [BsonElement("abilities")]
        public List<Abilities> abilities { get; set; }
        
        [BsonElement("sprites")]
        public Sprites sprites { get; set; }
        [BsonElement("moves")]
        public List<Moves> moves { get; set; }
        [BsonElement("types")]
        public List<Types> types { get; set; }

    }
}
