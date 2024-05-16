using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Move
    {
        [BsonElement("name")]
        public string name { get; set; }
        [BsonElement("url")]
        public string url { get; set; }
    }
}
