
import { registerUser } from './RegisterService';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Icons,
  useRouterContext,
  useNavigation,
} from '@pankod/refine';

export const Register = () => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  const CardTitle = (
    <Typography level={3} className="title">
      Sign up your account
    </Typography>
  );

  const { Link } = useRouterContext();
  const { push } = useNavigation();

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
        }}
      >
        <Col xs={6}>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              fontWeight: 600,
              padding: '1rem',
              color: '#67be23',
            }}
          >
            Sign Up
          </Typography>
          <div className="container">
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form
                layout="vertical"
                onFinish={async (value) => {
                  toast.dismiss();
                  setDisable(true);
                  const res = await registerUser(value, dispatch);
                  if (res) {
                    return Promise.resolve(push('/login')).then(
                      () => {
                        toast.success('Sign Up successfully', {
                          position: 'top-center',
                          theme: 'light',
                          autoClose: 1000,
                          hideProgressBar: true,
                        });
                      }
                    );
                  } else {
                    toast.error(
                      'Your email already exist, please sign up another email',
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
                    // onPaste={(e)=>{
                    //   e.preventDefault()
                    //   return false;
                    // }}
                    // onCopy={(e)=>{
                    //   e.preventDefault()
                    //   return false;
                    // }}
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
                        if (
                          !value ||
                          getFieldValue('password') === value
                        ) {
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
                    // onPaste={(e)=>{
                    //   e.preventDefault()
                    //   return false;
                    // }}
                    // onCopy={(e)=>{
                    //   e.preventDefault()
                    //   return false;
                    // }}
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
                  Sign up
                </Button>

                <Typography style={{ marginTop: '1rem' }}>
                  Already have an account?{' '}
                  <Link style={{ fontWeight: '600' }} to="/login">
                    Sign in
                  </Link>
                </Typography>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </AntdLayout>
  );
};
