
import { 
    Create,
    DatePicker,
    Upload,
    Form, 
    Input, 
    Typography,     
    getValueFromEvent,
    file2Base64,
    useForm,
} from "@pankod/refine";
import dayjs from "dayjs"

export const CreateUser = () => {
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
                <Form 
                    {...formProps} layout="vertical"
                    onFinish={async (values) => {
                        const base64Files = [];
                        const { avatar } = values;
    
                        for (const file of avatar) {
                            if (file.originFileObj) {
                                const base64String = await file2Base64(file);
    
                                base64Files.push({
                                    ...file,
                                    base64String,
                                });
                            } else {
                                base64Files.push(file);
                            }
                        }
    
                        return (
                            formProps.onFinish &&
                            formProps.onFinish({
                                ...values,
                                avatar: base64Files,
                            })
                        );
                    }}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Birthday"
                        name="birthday"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : "",
                        })}
                    >
                        <DatePicker size={10000}/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Avatar">
                        <Form.Item
                            name="avatar"
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
                                multiple= {false}
                                beforeUpload={() => false}
                                isImageUrl={() => true}
                                maxCount={1}
                                fileList
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
