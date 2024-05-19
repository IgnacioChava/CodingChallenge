import { Button, Card, Form, Input, Modal, Popover, UploadFile } from "antd"
import { useEffect, useState } from "react";
import { useDependencies } from "./hooks";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import { Pokemon } from "../../models/poke.models";
import { CreatePokeInput } from "./types";

const EditPokePage = () => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>();
    const [fileList1, setFileList1] = useState<UploadFile[]>();
    const [previewOpen1, setPreviewOpen1] = useState(false);
    const [previewImage1, setPreviewImage1] = useState('');
    const [previewTitle1, setPreviewTitle1] = useState('');

    const { handleSubmit } = useDependencies();

    const { name } = useParams();

    const { handlePetitionByName } = useDependencies();
    const [poke, setPoke] = useState<Pokemon | null>();
    const [data, setData] = useState<boolean>(false);

    const [form] = Form.useForm();


    useEffect(() => {
        const fetchImages = () => {

            form.setFieldsValue({
                ability_1: poke?.abilities?.[0]?.ability?.name || '',
                ability_2: poke?.abilities?.[1]?.ability?.name || '',
                move_1: poke?.moves?.[0]?.move?.name || '',
                move_2: poke?.moves?.[1]?.move?.name || '',
                move_3: poke?.moves?.[2]?.move?.name || '',
            });
            
         
            const main: UploadFile[] = [];
            const sprites: UploadFile[] = [];

            const base64StringFromDB1 = poke?.sprites.other.home.front_default;
            const base64StringFromDB2 = poke?.sprites.front_default;
            const base64StringFromDB3 = poke?.sprites.back_default;

            console.log("images a guardar");
            console.log(base64StringFromDB1)
            console.log(base64StringFromDB2)
            console.log(base64StringFromDB3)

            const fileFromDB1: UploadFile = {
                uid: '-1',
                name: 'file1.png',
                status: 'done',
                url: `${base64StringFromDB1}`,
            };
            main.push(fileFromDB1)

            const fileFromDB2: UploadFile = {
                uid: '-2',
                name: 'file2.png',
                status: 'done',
                url: `${base64StringFromDB2}`,
            };
            const fileFromDB3: UploadFile = {
                uid: '-3',
                name: 'file3.png',
                status: 'done',
                url: `${base64StringFromDB3}`,
            };

            sprites.push(fileFromDB2)
            sprites.push(fileFromDB3)


            setFileList(main);
            setFileList1(sprites);


            console.log(fileList);
            console.log(fileList1);
        };

        const fetchData = async () => {
            try {
                const response = await handlePetitionByName(name as string);
                setPoke(response);
                console.log("Objeto Poke");
                console.log(response); // 
                void fetchImages();
            } catch (error) {
                console.error('Failed to get posts list: ', error);
            }
        };

        
        void fetchData();
        
    }, [data]);

    return (
        <div className="landingPageContainer">
            <Card hoverable>
                <Form
                    onFinish={
                        (e) => {
                            const pokemon:CreatePokeInput = {
                                id:"",
                                name:poke?.name as string,
                                type:e.type,
                                ability_1:e.ability_1,
                                ability_2:e.ability_2,
                                image:fileList,
                                images_sprites:fileList1,
                                move_1:e.move_1,
                                move_2:e.move_2,
                                move_3:e.move_3,
                                is_uploaded:poke?.is_uploaded as boolean
                            }
                        //console.log(pokemon)
                        handleSubmit(pokemon)
                        }

                    } className="card" form={form}>

                    <Form.Item
                        name="name" label="Update" valuePropName="name" getValueFromEvent={(e) => e.name}
                    >
                        
                        <Input value={poke?.name as string} />
                        
                    </Form.Item>
                    <Form.Item
                        name="type" label="Type" rules={[{ required: true, message: 'Please insert a type' }]}
                    >
                        <div>
                            <Input onChange={() => {setData(true)}}/>
                        </div>
                    </Form.Item>
                    <Popover title="Abilities" trigger="hover" placement="leftTop">
                        <div style={{ display: "flex", gap: "4px" }} className="classForm">
                            <Form.Item
                                className="classFormItem" name="ability_1" label="No.1" rules={[{ required: true, message: 'Please insert an ability' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="classFormItem" name="ability_2" label="No.2" rules={[{ required: true, message: 'Please insert an ability' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Popover>

                    <Popover title="Moves" trigger="hover" placement="leftTop">
                        <div style={{ display: "flex", gap: "4px" }} className="classForm">
                            <Form.Item
                                className="classFormItem" name="move_1" label="No.1" rules={[{ required: true, message: 'Please insert a move' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="classFormItem" name="move_2" label="No.2" rules={[{ required: true, message: 'Please insert a move' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="classFormItem" name="move_3" label="No.3" rules={[{ required: true, message: 'Please insert a move' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </Popover>

                    <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
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

export default EditPokePage