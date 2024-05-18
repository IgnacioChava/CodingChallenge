import { useNavigate } from "react-router-dom";
import { Login } from "../../models/poke.models";
import { LoginForm } from "./types";
import { postLogin } from "../../service/http.service";
import { setSessionToken } from "../../service/cookies.service";
import useNotificationHandler from "../../hooks/useNotificationHandler";

export const useDependencies = () =>{

    const navigate = useNavigate();

    const {setNotification} = useNotificationHandler();

    const handleSubmit = async (values: LoginForm) => {

        console.log(values);

        const user: Login = {
			username: values.username,
			password: values.password,
		};

        const result = await postLogin(user); 

        if(result.failed){
            setNotification("El sign up ha fallado, intente de nuevo", "error");
        }else{
            setSessionToken(result.response?.data.token as string);
            navigate('/');
            window.location.reload();
        }
    }

    
        
    return {
        handleSubmit  
    }

};