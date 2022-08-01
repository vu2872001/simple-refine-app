import { Button, Modal } from "antd";
import { Form, Input, Icons, EditButton } from "@pankod/refine";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "components/users/UserService";
import { store } from "redux/store";

function UpdateUserModal({ data }) {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <EditButton size="small" hideText onClick={showModal} />
      <Modal
        title="Update User Info"
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ top: "200px" }}
        maskClosable={false}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={async (value) => {
            toast.dismiss();
            setDisable(true);
            const token = store.getState().auth.login.currentUser.access;
            const res = await updateUser(data.id, value, token, dispatch);
            if (res) {
              toast.success("Update successfully", {
                position: "top-center",
                theme: "light",
                autoClose: 1000,
                hideProgressBar: true,
              });
              setTimeout(() => window.location.reload(), 500);
            } else {
              toast.error(
                "Your email already exist, please register another email",
                {
                  position: "top-center",
                  theme: "light",
                  autoClose: 3000,
                  hideProgressBar: true,
                }
              );
              setTimeout(() => setDisable(false), 1000);
            }
          }}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            initialValue={data.email}
          >
            <Input
              size="large"
              placeholder="Email"
              type="email"
              minLength={10}
              maxLength={50}
              prefix={
                <Icons.MailOutlined
                  style={{
                    color: "rgba(0,0,0,.25)",
                    marginRight: "4px",
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="username"
            label="User name"
            initialValue={data.username}
            rules={[{ required: true }]}
          >
            <Input
              type="text"
              placeholder="username"
              size="large"
              minLength={7}
              maxLength={50}
              prefix={
                <Icons.UserOutlined
                  style={{
                    color: "rgba(0,0,0,.25)",
                    marginRight: "4px",
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            initialValue={data.name}
          >
            <Input
              type="text"
              placeholder="name"
              size="large"
              minLength={7}
              maxLength={50}
              prefix={
                <Icons.UserOutlined
                  style={{
                    color: "rgba(0,0,0,.25)",
                    marginRight: "4px",
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true }]}
            initialValue={data.age}
          >
            <Input
              type="number"
              placeholder="age"
              size="large"
              min={1}
              max={150}
              prefix={
                <Icons.CalendarOutlined
                  style={{
                    color: "rgba(0,0,0,.25)",
                    marginRight: "4px",
                  }}
                />
              }
            />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            disabled={disable}
            loading={disable}
          >
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
}
export default UpdateUserModal;
