import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  useLogin,
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
} from "@pankod/refine";
import { loginAuth } from "./LoginService";

import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const { mutate: login } = useLogin();
  const {isFetching} = useSelector((state) => state.auth.login);

  const CardTitle = (
    <Typography level={3} className="title">
      Login your account
    </Typography>
  );

  const { Link } = useRouterContext();

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={6}>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "3rem",
              fontWeight: 600,
              padding: "1rem",
              color: "#67be23",
            }}
          >
            Login
          </Typography>
          <div className="container">
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form
                layout="vertical"
                onFinish={async (value) => {
                  toast.dismiss();
                  setDisable(true);
                  const res = await loginAuth(value, dispatch);
                  if (res) {                  
                    toast.success("Sign In successfully!!!", {
                      position: "top-center",
                      theme: "light",
                      autoClose: false,
                    });
                    setTimeout(() => login(res), 1000);
                  } else {
                    toast.error("Email or password aren't correct!!!", {
                      position: "top-center",
                      theme: "light",
                      autoClose: 3000,
                      hideProgressBar: true,
                    });
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
                >
                  <Input
                    size="large"
                    placeholder="Email"
                    type="email"
                    minLength={10}
                    maxLength={50}
                    prefix={
                      <Icons.MailOutlined
                        style={{ color: "rgba(0,0,0,.25)", marginRight: "4px" }}
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
                        style={{ color: "rgba(0,0,0,.25)", marginRight: "4px" }}
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
                  Sign in
                </Button>

                <Typography style={{ marginTop: "1rem" }}>
                  Don’t have an account?{" "}
                  <Link style={{ fontWeight: "600" }} to="/register">
                    Sign up
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
