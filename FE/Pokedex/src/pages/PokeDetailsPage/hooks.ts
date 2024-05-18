import { useNavigate } from "react-router-dom";
import useNotificationHandler from "../../hooks/useNotificationHandler";
import { getPokeByName } from "../../service/http.service"

export const useDependencies = () =>{

    const {setNotification} = useNotificationHandler();

    

    const handlePetitionByName = async (name: string) => {


        const {failed, success, response} = await getPokeByName(name);

        if(failed == true){
            setNotification("The Pokemons does not exist ", "error");
        }else{
            return response?.data;
        }
    }

    
        
    return {
        handlePetitionByName 
    }

};