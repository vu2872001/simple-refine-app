import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'pages/users/UserService';
import { toast } from 'react-toastify';
import {
  Row,
  Col,
  Form,
  Input,
  Icons,
  Typography,
  Button,
  useOne,
} from '@pankod/refine';

export const UserInfo = () => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const { data } = useOne({
    resource: 'user/me',
    queryOptions: {  },
  });
  const res = data?.data;

  return (
    <div className="user-info">
      <Typography
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 600,
          padding: '1rem',
          color: '#67be23',
        }}
      >
        Your Informations
      </Typography>
      <Row
        justify="center"
        align="middle"
        style={{
          marginTop: 50,
        }}
      >
        <Col xs={6}>
          {res && (
            <Form
              layout="vertical"
              requiredMark={false}
              initialValues={res}
              onFinish={async (value) => {
                toast.dismiss();
                setDisable(true);
                const update = await updateUser(
                  res.id,
                  value,
                  dispatch
                );
                if (update) {
                  toast.success('Update successfully', {
                    position: 'top-center',
                    theme: 'light',
                    autoClose: 1000,
                    hideProgressBar: true,
                  });
                  setTimeout(() => window.location.reload(), 1000);
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
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
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
                label="User name"
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  minLength={2}
                  maxLength={50}
                  prefix={
                    <Icons.UserOutlined
                      style={{
                        color: 'rgba(0,0,0,.25)',
                        marginRight: '4px',
                      }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  minLength={2}
                  maxLength={50}
                  prefix={
                    <Icons.UserOutlined
                      style={{
                        color: 'rgba(0,0,0,.25)',
                        marginRight: '4px',
                      }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  min={1}
                  max={100}
                  prefix={
                    <Icons.CalendarOutlined
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
                style={{ marginTop: 12, height: 40 }}
              >
                Save
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
