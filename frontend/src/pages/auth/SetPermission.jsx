import { store } from 'redux/store';
import { useState } from 'react';
import {
  Typography,
  Form,
  Col,
  Row,
  Input,
  Icons,
  Button,
  Select,
  useCustom,
} from '@pankod/refine';
import { toast } from 'react-toastify';

const SetPermission = () => {
  const [disable, setDisable] = useState(false);

  const { data } = useCustom({
    url: 'permission/my-permissions',
    queryOptions: {},
  });
  const res = data?.data;

  const state = store.getState();
  const userList = state.users.getAll.usersData?.data;

  const { Option } = Select;

  return (
    <div>
      <Typography
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 600,
          padding: '1rem',
          color: '#67be23',
        }}
      >
        Set Permissions
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
              // initialValues={}
              onFinish={async (value) => {
                toast.dismiss();
                setDisable(true);
                if (value) {
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
              <Form.Item label="User">
                <Select>
                  {userList.map((item) => (
                    <Option value={item.id}>{item.username}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Permissions">
                <Select>
                  {res.map((item) => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
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

export default SetPermission;
