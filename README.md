# Instrucciones para la ejecución del proyecto

## Crear imagen de MongoDB en Docker y ejecutar contenedor

Para crear la imagen de MongoDB y ejecutar el contenedor, sigue estos pasos:

1. Navega a la carpeta `Scripts` ubicada en la carpeta `BE`.
2. Ejecuta los siguientes comandos en orden:
   - `./init-docker-mongo.sh`
   - `./init-db.sh`

## Ejecución del Back End

### Método 1: Usando Visual Studio 2022

1. Abre la solución del proyecto en Visual Studio 2022.
2. Ejecuta el proyecto desde Visual Studio.

### Método 2: Usando la consola

1. Instala el SDK de .NET:
   - Puedes descargar el SDK de .NET 8 desde [aquí](https://dotnet.microsoft.com/download) para Linux, macOS y Windows.
2. Ejecuta el comando `dotnet run` dentro de la carpeta `BE/Backend/Backend`.

### Ejecución de Unit Tests

Para ejecutar los unit tests, navega a la carpeta `BE/Backend` y ejecuta el comando `dotnet test`.

## Ejecución del Front End

Para ejecutar el Front End, sigue estos pasos:

1. Navega a la carpeta `FE/Pokedex`.
2. Instala los node_modules con `npm i`
3. Ejecuta el comando `vite run dev` para inciar el FE.
