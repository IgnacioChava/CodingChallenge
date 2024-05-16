docker run -d \
    --name mongo-server-hatchworks \
    -e MONGO_INITDB_ROOT_USERNAME="PokeUser" \
    -e MONGO_INITDB_ROOT_PASSWORD="password" \
    -p 28017:27017 \
    mongo:latest