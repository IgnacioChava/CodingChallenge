using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Other
    {
        [BsonElement("home")]
        public HomeSprite home {  get; set; }
    }
}
