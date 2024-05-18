import { Alert, Space } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import useNotificationHandler from "../../hooks/useNotificationHandler";
import { isNill } from "../../utils/comon.utils";
import useSessionHandler from "../../hooks/useSessionHandler";
import { Outlet } from "react-router-dom";


const Main = () => {

    const { getErrorNotification, clearNotification } = useNotificationHandler();
    const isSessionActive = useSessionHandler();
    const onClose = () => {
        console.log('I was closed.');
        clearNotification();

    };

    const isError = getErrorNotification();
    return (
        <>
            {isSessionActive() == true ? 

                <Navbar></Navbar>

            : null}
            {isError.msg != "" || isNill(isError.msg) ? (
                <Alert
                    style={{
                        textAlign: 'left', // Cambiado a 'left' para mantener el texto alineado a la izquierda
                        direction: 'rtl', // Cambiado a 'rtl' para mantener el texto alineado a la derecha
                        position: 'fixed',
                        width: '20%',
                        zIndex: '100',
                        top: 0, // Ajustado a la parte superior
                        right: 0, // Ajustado al borde derecho
                    }}
                    description={isError.msg}
                    type={isError.type}
                    showIcon 
                    closable
                    onClose={onClose}
                />
            ) : null}
            <Outlet></Outlet>


        </>

    );
}

export default Main;
