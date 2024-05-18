import { Button, Card, Form, Input, Modal, Popover, UploadFile } from "antd"
import { useState } from "react";
import { useDependencies } from "./hooks";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import "./styles.css"
import { Link } from "react-router-dom";

const CreatePokePage = () => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>();
    const [fileList1, setFileList1] = useState<UploadFile[]>();
    const [previewOpen1, setPreviewOpen1] = useState(false);
    const [previewImage1, setPreviewImage1] = useState('');
    const [previewTitle1, setPreviewTitle1] = useState('');

    const { handleSubmit } = useDependencies();

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);

        });

    const CancelView = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };


    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(newFileList);
    }

    //sprites
    const handlePreview1 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage1(file.url || (file.preview as string));
        setPreviewOpen1(true);
        setPreviewTitle1(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };


    const handleChange1: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList1(newFileList);
        console.log(newFileList);
    }

    const CancelView1 = () => setPreviewOpen(false);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const getFile = (e: any) => {

        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div className="landingPageContainer">
            <Card hoverable>


                <Form
                    onFinish={handleSubmit} className="card">

                    <Form.Item
                        name="name" label="Name" rules={[{ required: true, message: 'Please insert a name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type" label="Type" rules={[{ required: true, message: 'Please insert a type' }]}
                    >
                        <Input />

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
                    
                    <Form.Item label="Image" rules={[{ required: true, message: 'Please insert an image' }]} name="image" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} className="containerUpload">
                       
                            <Upload
                                multiple={false}
                                onChange={handleChange}
                                onPreview={handlePreview}
                                fileList={fileList}
                                beforeUpload={() => false}
                                listType="picture-card">
                                {fileList?.length as number >= 1 ? null : uploadButton}

                            </Upload>
                            
                        </Form.Item>
                  
                    
                    <Form.Item name="images_sprites" label="Sprites" rules={[{ required: true, message: 'Please insert at least image' }]} valuePropName="fileList" getValueFromEvent={(e) => e.fileList} className="containerUpload">
                        <Upload
                            multiple={false}
                            onChange={handleChange1}
                            onPreview={handlePreview1}
                            fileList={fileList1}
                            beforeUpload={() => false}
                            listType="picture-card">
                            {fileList1?.length as number >= 2 ? null : uploadButton}
                        </Upload>
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent:"space-evenly" }} >
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

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={CancelView}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Modal open={previewOpen1} title={previewTitle1} footer={null} onCancel={CancelView1}>
                <img alt="example" style={{ width: '100%' }} src={previewImage1} />
            </Modal>

        </div>
    );

}

export default CreatePokePage