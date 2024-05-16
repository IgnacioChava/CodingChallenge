using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Types
    {
        [BsonElement("slot")]
        public int slot { get; set; }
        [BsonElement("type")]
        public Type type { get; set; }
    }
}
