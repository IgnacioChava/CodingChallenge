import { useNavigate } from "react-router-dom";
import { Login } from "../../models/poke.models";
import { LoginForm } from "./types";
import { postSignUp } from "../../service/http.service";

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

        const {failed} = await postSignUp(user); 

        if(failed){
            setNotification("El sign up ha fallado, intente de nuevo", "error");
        }else{
            setNotification("El sign up ha sido exitoso!", "success");
        }
    }

    const handleCancel = () => {
        navigate("/");
    }
        
    return {
        handleSubmit  
    }

};