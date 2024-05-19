import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDependencies } from "./hooks";
import { Button, Card } from "antd";
import { Pokemon } from "../../models/poke.models";
import "./styles.css"



const PokeDetails = () => {
    const { name } = useParams();

    const { handlePetitionByName } = useDependencies();
    const [poke, setPoke] = useState<Pokemon | null>();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await handlePetitionByName(name as string);
                setPoke(response);


            } catch (error) {
                console.error('Failed to get posts list: ', error);

            }



        };

        void fetchData();
    }, []);




    return (
        <div className="container">
            {name == null ? (
                <h1>There is no pokemon in here!</h1>
            ) : (
                <Card className="cardLogin1">
                    <h1 style={{ marginTop: "5%", display:"flex", justifyContent:"center" }}>{poke?.name}</h1>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {poke?.is_uploaded == true ? (
                            <img className="imagePoke" src={`data:image/png;base64,${poke?.sprites.other.home.front_default as string}`} alt={'ImagenPintura'} />
                        ) : <>
                            <img className="imagePoke" src={poke?.sprites.other.home.front_default as string} alt={'ImagenPokemon'} />
                        </>}
                    </div>
                    <div className="pokeDetailsInner">
                        <div>
                            <h3>Type:</h3>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {poke?.types.map((type, index) => (
                                    <div key={index}>
                                        <h4>{type.type.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3>Abilities:</h3>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {poke?.abilities.map((ability, index) => (
                                    <div key={index}>
                                        <h4>{ability.ability.name}</h4>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h3>Moves:</h3>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {poke?.moves.map((move, index) => (
                                    <div key={index}>
                                        <h4>{move.move.name}</h4>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="pokeDetailsInnerSprite">
                        {poke?.is_uploaded == true ? (
                            <div>
                                <img className="imagePoke" src={`data:image/png;base64,${poke.sprites.front_default as string}`} alt={'ImagenPintura'} />
                                <img className="imagePoke" src={`data:image/png;base64,${poke.sprites.back_default as string}`} alt={'ImagenPintura'} />

                            </div>

                        ) : <>
                            <img className="imagePokeSprite" src={poke?.sprites.front_default as string} alt={'ImagenPokemonSprite'} />
                            <img className="imagePokeSprite" src={poke?.sprites.back_default as string} alt={'ImagenPokemonSprite'} />
                        </>}

                    </div>




                    <Link to="/"><Button type="dashed">Devolverse</Button></Link>
                </Card>
            )}
        </div>
    );
}

export default PokeDetails;
