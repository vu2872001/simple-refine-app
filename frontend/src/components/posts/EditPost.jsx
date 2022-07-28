import { Typography, Form, Input, Edit, useSelect, useShow, usePermissions, useForm, } from "@pankod/refine";

export const EditPost = () => {
    const { formProps, saveButtonProps  } = useForm();
    const { queryResult } = useShow();
    const { data: permissionsData } = usePermissions(); 

    const { selectProps: categorySelectProps } = useSelect({
        resource: "posts",
        defaultValue: queryResult.data?.data?.id,
    });

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
            <Edit isLoading={categorySelectProps.loading} saveButtonProps={saveButtonProps} canDelete={permissionsData?.includes("admin")}>
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
                </Form>
            </Edit>
        </div>
    );
};