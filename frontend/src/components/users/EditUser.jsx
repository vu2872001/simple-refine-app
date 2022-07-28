import { 
    Typography, 
    Form, 
    Input, 
    Edit,
    Upload,
    file2Base64,
    getValueFromEvent,
    useShow, 
    useGetIdentity, 
    useForm,
    DatePicker,
 } from "@pankod/refine";
import dayjs from "dayjs";

export const EditUser = () => {
    const { formProps, saveButtonProps  } = useForm();
    const { queryResult } = useShow();
    const { data: identity } = useGetIdentity();
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
                Edit User
            </Typography>
            <Edit isLoading={queryResult.isLoading} saveButtonProps={saveButtonProps} canDelete={identity==="Admin"}>
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
                        <DatePicker size="large"/>
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

                    <Form.Item label="Avatar" >
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
                            >
                                <p className="ant-upload-text">
                                    Drag & drop a file in this area
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Edit>
        </div>
    );
};