import { Button, Modal } from 'antd';
import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { registerUser } from 'pages/registerpage/RegisterService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLogin,
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Icons,
  useNavigation,
  useRouterContext,
} from '@pankod/refine';

function CreateUserModal() {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  // const {isFetching} = useSelector((state) => state.auth.register)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary " onClick={showModal}>
        Create New User
      </Button>
      <Modal
        title="Create User"
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ top: '200px' }}
        maskClosable={false}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={async (value) => {
            toast.dismiss();
            setDisable(true);
            const res = await registerUser(value, dispatch);
            if (res) {
              toast.success('Create user successfully', {
                position: 'top-center',
                theme: 'light',
                autoClose: 1000,
                hideProgressBar: true,
              });
              window.location.reload();
            } else {
              toast.error(
                'Your email already exist, please register another email',
                {
                  position: 'top-center',
                  theme: 'light',
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
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
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
                    color: 'rgba(0,0,0,.25)',
                    marginRight: '4px',
                  }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              type="password"
              placeholder="●●●●●●●●"
              size="large"
              minLength={7}
              maxLength={50}
              prefix={
                <Icons.KeyOutlined
                  style={{
                    color: 'rgba(0,0,0,.25)',
                    marginRight: '4px',
                  }}
                />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!'
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="●●●●●●●●"
              size="large"
              minLength={7}
              maxLength={50}
              prefix={
                <Icons.KeyOutlined
                  style={{
                    color: 'rgba(0,0,0,.25)',
                    marginRight: '4px',
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
            Create
          </Button>
        </Form>
      </Modal>
    </>
  );
}
export default CreateUserModal;
