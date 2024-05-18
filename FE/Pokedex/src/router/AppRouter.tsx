import { BrowserRouter, Route, Routes } from "react-router-dom";
import useSessionHandler from "../hooks/useSessionHandler";
import Main from "../pages/Main/Main";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PokePage from "../pages/PokePage/PokePage";
import CreatePokePage from "../pages/CreatePokePage/CreatePokePage";
import PokeDetails from "../pages/PokeDetailsPage/PokeDetails";
import EditPokePage from "../pages/EditPokePage/EditPokePage";




const publicRoutes = () =>  {
    return (
        <Routes>
            
            <Route path="/" element={<Main></Main>}>

                <Route index element={<LoginPage></LoginPage>}></Route>
                <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
                
            </Route>

        </Routes>
    );
}

const privateRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Main></Main>}>
                <Route index element={<PokePage></PokePage>}></Route>
                <Route path="/create" element={<CreatePokePage></CreatePokePage>}></Route>
                <Route path="/poke/:name" element={<PokeDetails></PokeDetails>}></Route>
                <Route path="/edit/poke/:name" element={<EditPokePage></EditPokePage>}></Route>

            </Route>
    </Routes>
    );
    
}


const AppRouter = () => {

    
    //create a function that validates the token

    const isSessionActive = useSessionHandler();
    
    return (
       <>
            <BrowserRouter>
                {isSessionActive() != true ? publicRoutes() : privateRoutes()}
            </BrowserRouter>
       </>
    );
}

export default AppRouter;


