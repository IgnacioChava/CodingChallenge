using Microsoft.Extensions.Diagnostics.HealthChecks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.repository.Model
{
    public class HomeSprite
    {
        [BsonElement("front_default")]
        public string front_default {  get; set; }
    }
}
