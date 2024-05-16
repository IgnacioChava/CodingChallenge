using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class Sprites
    {
        [BsonElement("back_default")]
        public string ?back_default { get; set; }
        [BsonElement("back_female")]
        public string ?back_female { get; set; }
        [BsonElement("back_shiny")]
        public string? back_shiny { get; set; }
        [BsonElement("back_shiny_female")]
        public string ?back_shiny_female { get; set; }
        [BsonElement("front_default")]
        public string ?front_default { get; set; }
        [BsonElement("front_female")]
        public string ?front_female { get; set; }
        [BsonElement("front_shiny")]
        public string ?front_shiny { get; set; }
        [BsonElement("front_shiny_female")]
        public string ?front_shiny_female { get; set; }
        [BsonElement("other")]
        public Other ?other { get; set; }


    }
}
