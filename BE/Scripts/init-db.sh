MONGO_CONTAINER_NAME="mongo-server-hatchworks"
MONGO_DB_NAME="PokemonDB"
MONGO_USER="PokeUser"
MONGO_PASSWORD="password"
COLLECTION_NAME="Pokemon"
docker exec -i $MONGO_CONTAINER_NAME mongosh -u "$MONGO_USER" -p "$MONGO_PASSWORD" --authenticationDatabase admin <<EOF
use $MONGO_DB_NAME
db.createCollection("$COLLECTION_NAME")
EOF