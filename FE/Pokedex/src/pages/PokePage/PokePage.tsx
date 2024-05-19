import { useEffect, useState } from "react";
import { useDependencies } from "./hooks"
import { AutoComplete, Button, Card, Carousel, Form, Space } from "antd";
import { SearchOutlined, DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import './styles.css'
import { Link, useNavigate } from "react-router-dom";
import { Pokemon } from "../../models/poke.models";




const PaintPage = () => {

    const navigate = useNavigate()
    const { handlePetition, handleDelete, handleDefaultPokemon } = useDependencies();

    const [pokemones, setPokemones] = useState<Pokemon[] | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [deletePk, setDelete] = useState<string>("");
    const [insPokemon, setInsPokemon] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (deletePk != "") {
                    const resp = await handleDelete(deletePk);
                } 
                const response = await handlePetition();
                if(response?.length as number > 0){
                    setInsPokemon(true);
                }
                setPokemones(response);
                setDelete("");
                setLoading(false);
            } catch (error) {
                console.error('Failed ', error);
                setLoading(false);
            }
        };

        void fetchData();
    }, [deletePk]);

    const deletePoke = (name: string) => {
        setDelete(name);
    }
    return (
        <>
            {loading ? (
                <div className="spinClass">
                    <div className="loading">Loading&#8230;</div>
                </div>) :
                <>
                    {insPokemon == false ? 
                    (
                        <div>
                            <h1>Get Pokemons!</h1>
                            <Button onClick={() => handleDefaultPokemon()}>
                                    <FormOutlined/>
                            </Button>
                        </div>
                    )
                    :
                    <div className="PokePage">
                        
                        {pokemones?.map((poke, index) => (
                            <div key={index}>
                                
                                    <Card className="cardPoke" 
                                        cover={
                                            <div>
                                                {poke.is_uploaded == true ? (
                                                    <img className="imagePoke" src={`data:image/png;base64,${poke.sprites.other.home.front_default as string}`} alt={'ImagenPintura'} />
                                                ) : <>
                                                    <img className="imagePoke" src={poke.sprites.other.home.front_default as string} alt={'ImagenPokemon'} />
                                                </>}

                                            </div>

                                        }>
                                        <div style={{display:"flex", justifyContent:"end"}}>
                                            <Button onClick={() => deletePoke(poke.name)}>
                                                <DeleteOutlined />
                                            </Button>
                                            <Button>
                                                <Link to={`/poke/${poke.name}`}>
                                                    <SearchOutlined></SearchOutlined>
                                                </Link>
                                            </Button>
                                            <Button>
                                                <Link to={`/edit/poke/${poke.name}`}>
                                                    <EditOutlined />
                                                </Link>
                                            </Button>
                                            
                                        </div>
                                        <h1>Name: {poke.name}</h1>
                                        <h3>Type:</h3>
                                        <div style={{ display: "flex", gap: "3px" }}>
                                            {poke.types.map((type, index) => (
                                                <div key={index}>
                                                    <h4>{type.type.name}</h4>
                                                </div>
                                            ))}
                                        </div>

                                        <h3>Abilities:</h3>
                                        <div style={{ display: "flex", gap: "3px" }}>
                                            {poke.abilities.map((ability, index) => (
                                                <div key={index}>
                                                    <h4>{ability.ability.name}</h4>
                                                </div>
                                            ))}
                                        </div>
                                        <h3>Sprites:</h3>
                                        <div className="pokeSprites">
                                            {poke.is_uploaded == true ? (
                                                <div>
                                                    <img className="imagePoke" src={`data:image/png;base64,${poke.sprites.front_default as string}`} alt={'ImagenPintura'} />
                                                    <img className="imagePoke" src={`data:image/png;base64,${poke.sprites.back_default as string}`} alt={'ImagenPintura'} />

                                                </div>

                                            ) : <>
                                                <img className="imagePokeSprite" src={poke.sprites.front_default as string} alt={'ImagenPokemonSprite'} />
                                                <img className="imagePokeSprite" src={poke.sprites.back_default as string} alt={'ImagenPokemonSprite'} />
                                            </>}


                                        </div>
                                        <h3>Moves:</h3>
                                        <div style={{ display: "flex", gap: "3px" }}>
                                            {poke.moves.map((move, index) => (
                                                <div key={index}>
                                                    <h4>{move.move.name}</h4>
                                                </div>
                                            ))}
                                        </div>


                                    </Card>
                                
                            </div>
                        ))}


                    </div>
                    }


                </>}


        </>
    )
}

export default PaintPage