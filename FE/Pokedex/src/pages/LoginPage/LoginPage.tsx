import { Button, Card, Form, Input } from "antd";
import { useDependencies } from "./hooks";
import './styles.css'
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const { handleSubmit } = useDependencies();
    const navigate = useNavigate();
    const signUp = () => {
        navigate("/signUp")
    }

    return (
        <div className="container">


            <Card className="cardLogin">
                <Form
                    onFinish={handleSubmit} className="card">
                    <h1>Login</h1>
                    <Form.Item
                        name="username"
                    >
                        <div className="itemLogin">
                            <UserOutlined className="iconLogin" />
                            <Input />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="password"
                    >
                        <div className="itemLogin">
                            <LockOutlined className="iconLogin" />
                            <Input.Password />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="buttonLogin">Login</Button>
                    </Form.Item>
                    <Button onClick={signUp}>Sign Up</Button>
                </Form>

            </Card>
        </div>






    );

}

export default LoginPage