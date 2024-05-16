using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Abilities
    {
        [BsonElement("ability")]
        public Ability ability { get; set; }

        [BsonElement("is_hidden")]
        public bool is_hidden { get; set; }
        [BsonElement("slot")]
        public int slot { get; set; }
    }
}
