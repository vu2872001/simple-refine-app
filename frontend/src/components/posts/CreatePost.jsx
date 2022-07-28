import { 
    Create, 
    Upload,
    Form, 
    Input, 
    Typography,     
    getValueFromEvent,
    useForm,
} from "@pankod/refine";

export const CreatePost = () => {
    const { formProps, saveButtonProps } = useForm();

    return (
        <div>
            <Typography
            style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 600,
            padding: "1rem",
            color: "#67be23",
            }}
            >                           
                Create User
            </Typography>
            <Create saveButtonProps={saveButtonProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Image">
                        <Form.Item
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                listType="picture"
                                multiple
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-text">
                                    Drag & drop a file in this area
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Create>
        </div>
    );
};
