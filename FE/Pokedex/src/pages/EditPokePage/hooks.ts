import { useNavigate } from "react-router-dom";
import { CreatePokeInput, PokemonType } from "./types";
import { createPoke, getPokeByName, updatePoke } from "../../service/http.service";

import { PokemonCreate, PokemonUpdate, pokeMoves, pokemonAbilities, pokemonTypes, sprites } from "../../models/poke.models";
import useNotificationHandler from "../../hooks/useNotificationHandler";

export const useDependencies = () =>{

    const navigate = useNavigate();

    const {setNotification} = useNotificationHandler();

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

        function isIterable(obj: any): obj is Iterable<any> {
            return obj != null && typeof obj[Symbol.iterator] === 'function';
        }

        if(isIterable(values.image)){
            for (const pictureFile of values.image) {
                if (pictureFile.originFileObj instanceof File) {
                    const base64 = await convertImageToBase64(pictureFile.originFileObj);
                    picturePoke.push(base64);
                } else {
                    console.log('Elemento en values.images no es un objeto File:', pictureFile);
                    picturePoke.push(pictureFile?.url)
                }
              }
        }else{
            picturePoke.push(values.image);
        }
        
         // Convertir cada imagen a base64 y agregarla a picturesBase64
         for (const pictureFile of values.images_sprites) {
            if (pictureFile.originFileObj instanceof File) {
                const base64 = await convertImageToBase64(pictureFile.originFileObj);
                picturesBase64.push(base64);
            } else {
                console.log('Elemento en values.images no es un objeto File:', pictureFile);
                picturesBase64.push(pictureFile?.url)

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

        const pokemon:PokemonUpdate = {
            id:values.id,
            name:values.name,
            abilities: pokeAbilities,
            sprites:spritePoke,
            moves:pokeMoves,
            types:pokeType,
            is_uploaded:values.is_uploaded
        }
        console.log("Prueba");
        console.log(pokemon)
        
        const result = await updatePoke(pokemon); 

        console.log(result);
        
        if(result == "OK"){
            console.log("Poke updated");
            navigate('/');
            window.location.reload();
        }else{
            console.log("error");
        }
    }

    const handlePetitionByName = async (name: string) => {
        
        const {failed, success, response} = await getPokeByName(name);

        if(failed == true){
            setNotification("The Pokemons does not exist ", "error");
        }else{
            return response?.data;
        }
    }

    
        
    return {
        handleSubmit,
        handlePetitionByName 
    }

};