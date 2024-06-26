import { Link, Outlet, useLocation } from "react-router-dom";
import { getSessionToken } from "../../service/cookies.service";
import { Menu, MenuProps, notification } from "antd";
import { FileAddOutlined, OrderedListOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { useState } from "react";
import useNotificationHandler from "../../hooks/useNotificationHandler";
import useSessionHandler from "../../hooks/useSessionHandler";
import './navbar.css'



const Navbar = () => {


    //TODO: HACER LLAMADA AL API PARA OBTENER EL TOKEN
    const isSessionActive= useSessionHandler();

    const getNotificationError = useNotificationHandler();


    const [current, setCurrent] = useState('');

    const [api, contextHolder] = notification.useNotification();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const items: MenuProps['items'] = [
        
        {
            label: (
                <Link to='/' className="icon">Pokemons</Link>
            ),
            key: 'pokemones',
            icon: <OrderedListOutlined />
        },
        {
            label: (
                <Link to='/create' className="icon">Create Pokemon</Link>
            ),
            key: 'pokemones',
            icon: <FileAddOutlined />
        },
        

    ]
    return (
        <div>
                

                    
                    {isSessionActive() == true ? 
                        <div>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className="navbar"></Menu>
                        
                        </div>
                    : null}
                        
       
                    
                    
               
     
        </div>
    );
}

export default Navbar;