import { Button, Card, Form, Input } from "antd";
import { useDependencies } from "./hooks";
import './styles.css'
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

const LoginPage = () => {

    const { handleSubmit } = useDependencies();


    return (
        <div className="container">


            <Card className="cardLogin">
                <Form
                    onFinish={handleSubmit} className="card">
                    <h1>Sign Up</h1>
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
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" danger>
                                <Link to="/">Cancel</Link>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </Card>
        </div>






    );

}

export default LoginPage