using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Moves
    {
        [BsonElement("move")]
        public Move move { get; set; }
    }
}
