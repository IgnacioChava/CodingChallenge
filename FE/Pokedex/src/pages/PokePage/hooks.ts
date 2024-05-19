import { AxiosError } from "axios";
import { deletePokeByName, getPokes, insertPokes } from "../../service/http.service";
import { isNill } from "../../utils/comon.utils";
import useNotificationHandler from "../../hooks/useNotificationHandler";
import { useNavigate } from "react-router-dom";

export const useDependencies = () =>{

    const {setNotification} = useNotificationHandler();
    const navigate = useNavigate();

    const handlePetition = async () => {


        const {failed, success, response} = await getPokes(); 

        if(failed == true){

            setNotification("There are no pokemons", "error");
            
        }else{
            return response?.data;
        }
    }

    const handleDefaultPokemon = async () => {


        const {failed, success, response} = await insertPokes(); 

        if(failed == true){

            setNotification("Error getting pokemons form PokeApi", "error");
            
        }else{
            setNotification("Inserted pokemons from PokeApi", "success");
            navigate("/");
            window.location.reload();
            
        }
    }

    const handleDelete = async (name:string) => {


        const {failed, success, response} = await deletePokeByName(name); 

        if(failed == true){

            setNotification("Could not remove the pokemon", "error");
            
        }else{
            return response?.data;
        }
    }        
    return {
        handlePetition,
        handleDelete,
        handleDefaultPokemon
    }

};