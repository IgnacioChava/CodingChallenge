import { AxiosError } from "axios";
import { deletePokeByName, getPokes } from "../../service/http.service";
import { isNill } from "../../utils/comon.utils";
import useNotificationHandler from "../../hooks/useNotificationHandler";

export const useDependencies = () =>{

    const {setNotification} = useNotificationHandler();

    const handlePetition = async () => {


        const {failed, success, response} = await getPokes(); 

        if(failed == true){

            setNotification("There are no pokemons", "error");
            
        }else{
            return response?.data;
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
    
    /*
    const handlePetitionByName = async (name: string) => {


        const {failed, success, response} = await getPaintsByAny(name); 

        console.log(response?.data);


        if(failed == true){
            console.log("no tengo datos");
            console.log("error");
            setErrorNotification("no se han podido recuperar las pinturas by name", "error");
        }else{
            return response?.data;
        }
    }*/

    
        
    return {
        handlePetition,
        handleDelete
    }

};