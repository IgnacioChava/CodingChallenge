using Backend.api.Controllers.DTO;
using Backend.handler.commands;
using Backend.repository;
using Backend.repository.Model;
using Moq;
using System.Xml.Linq;
using System;
using Backend.Interface;

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
    }
}