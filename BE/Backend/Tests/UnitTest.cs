using Backend.api.Controllers.DTO;
using Backend.handler.commands;
using Backend.repository;
using Backend.repository.Model;
using Moq;
using System.Xml.Linq;
using System;
using Backend.Interface;
using Backend.handler.queries;

namespace Tests
{
    [TestClass]
    public class UnitTest
    {
        [TestMethod]
        public void Handle_ShouldReturnOK_WhenPokemonIsCreated()
        {
            // Arrange
            var mockMongoDBService = new Mock<IMongoDBService>();
            mockMongoDBService.Setup(service => service.CreatePoke(It.IsAny<Pokemon>())).Returns(new Pokemon());
            var createPokemonHandler = new CreatePokemonTest(mockMongoDBService.Object);

            // Act
            string result = createPokemonHandler.handle( new PokemonDTO());

            Console.WriteLine(result);

            // Assert
            Assert.AreEqual("OK", result);
        }

        [TestMethod]
        public void Handle_ShouldReturnOK_WhenPokemonIsDeleted()
        {
            // Arrange
            var mockMongoDBService = new Mock<IMongoDBService>();
            //mockMongoDBService.Setup(service => service.CreatePoke(It.IsAny<Pokemon>())).Returns(new Pokemon());
            mockMongoDBService.Setup(service => service.DeletePokemon(It.IsAny<string>()));
            var deletePokemonHandler = new DeletePokemonTest(mockMongoDBService.Object);


            // Act
            string result = deletePokemonHandler.handle("test");

            Console.WriteLine(result);

            // Assert
            Assert.AreEqual("OK", result);
        }

        [TestMethod]
        public void Handle_ShouldReturnOK_WhenPokemonIsUpdated()
        {
            // Arrange
            var mockMongoDBService = new Mock<IMongoDBService>();
            mockMongoDBService.Setup(service => service.UpdatePokemon(It.IsAny<Pokemon>()));
            var updatePokemonHandler = new UpdatePokemonTest(mockMongoDBService.Object);

            // Act
            string result = updatePokemonHandler.handle(new Pokemon());

            Console.WriteLine(result);

            // Assert
            Assert.AreEqual("OK", result);
        }

        [TestMethod]
        public async Task Handle_ShouldReturnPokemons_WhenGetPokemons()
        {
            // Arrange
            var mockMongoDBService = new Mock<IMongoDBService>();
            var expectedPokemons = new List<Pokemon> { new Pokemon { name = "Pikachu" }, new Pokemon { name = "Bulbasaur" } };
            mockMongoDBService.Setup(service => service.GetPoke()).ReturnsAsync(expectedPokemons);

            var obtainPokemonsHandler = new ObtainPokemonsTest(mockMongoDBService.Object);

            // Act
            var result = await obtainPokemonsHandler.handle();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedPokemons.Count, result.Count);
            Assert.AreEqual(expectedPokemons[0].name, result[0].name);
            Assert.AreEqual(expectedPokemons[1].name, result[1].name);
        }
    }
}