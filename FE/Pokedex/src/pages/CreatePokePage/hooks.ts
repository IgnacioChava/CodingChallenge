import { useNavigate } from "react-router-dom";
import { CreatePokeInput, PokemonType } from "./types";
import { createPoke } from "../../service/http.service";

import { PokemonCreate, pokeMoves, pokemonAbilities, pokemonTypes, sprites } from "../../models/poke.models";

export const useDependencies = () =>{

    const navigate = useNavigate();

    const handleSubmit = async (values: CreatePokeInput) => {

        //TO DO: 
        
        const picturePoke: string[] = [];
        const picturesBase64: string[] = [];
        const pokeAbilities: pokemonAbilities[] = [];
        const pokeMoves: pokeMoves[] = [];
        const pokeType: pokemonTypes[] = [];
        console.log("pokemon");
        console.log(values);

        
        const cleanBase64String = (base64String: string): string => {
            return base64String.replace(/^data:image\/[a-z]+;base64,/, '');
        };


        const convertImageToBase64 = (file: File): Promise<string> => {

            return new Promise((resolve, reject) => {
            console.log(file);
            
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const base64String = reader.result as string;
                const cleanedBase64 = cleanBase64String(base64String);
                resolve(cleanedBase64);
              };
              reader.onerror = reject;
              
            });
        };

        for (const pictureFile of values.image) {
            if (pictureFile.originFileObj instanceof File) {
                const base64 = await convertImageToBase64(pictureFile.originFileObj);
                picturePoke.push(base64);
            } else {
                console.error('Elemento en values.images no es un objeto File:', pictureFile);
            }
          }
         // Convertir cada imagen a base64 y agregarla a picturesBase64
         for (const pictureFile of values.images_sprites) {
            if (pictureFile.originFileObj instanceof File) {
                const base64 = await convertImageToBase64(pictureFile.originFileObj);
                picturesBase64.push(base64);
            } else {
                console.error('Elemento en values.images no es un objeto File:', pictureFile);
            }
          }
        
        const ability1:pokemonAbilities = {
            ability:{
                name: values.ability_1,
                url:"",
            },
            is_hidden:true,
            slot:0
        }
        pokeAbilities.push(ability1);
        const ability2:pokemonAbilities = {
            ability:{
                name: values.ability_2,
                url:"",
            },
            is_hidden:true,
            slot:0
        }
        pokeAbilities.push(ability2);

        let spritePoke;

        if(picturesBase64.length > 1){
            const pokeSprite:sprites = {
                front_default:picturesBase64[0],
                back_default:picturesBase64[1],
                other:{
                    home:{
                        front_default:picturePoke[0]
                    }
                }
            }
            spritePoke = pokeSprite;
        }else{
            const pokeSprite:sprites = {
                front_default:picturesBase64[0],
                back_default:null,
                other:{
                    home:{
                        front_default:picturePoke[0]
                    }
                }
            }
            spritePoke = pokeSprite;
        }
        const Move:pokeMoves={
            move:{
                name:values.move_1,
                url:""
            }
        }
        pokeMoves.push(Move)
        const Move1:pokeMoves={
            move:{
                name:values.move_2,
                url:""
            }
        }
        pokeMoves.push(Move1)
        const Move2:pokeMoves={
            move:{
                name:values.move_3,
                url:""
            }
        }
        pokeMoves.push(Move2)
        const typePoke:pokemonTypes={
            type:{
                name:values.type,
                url:""
            },
            slot:0
        }
        pokeType.push(typePoke);

        const pokemon:PokemonCreate = {
            name:values.name,
            abilities: pokeAbilities,
            sprites:spritePoke,
            moves:pokeMoves,
            types:pokeType
        }

        console.log(pokemon)
        

        const result = await createPoke(pokemon); 

        console.log(result);
        
        if(result == "OK"){
            console.log("Imagen Guardada");
            navigate('/');
            window.location.reload();
        }else{
            console.log("error");
        }
    }

    
        
    return {
        handleSubmit  
    }

};