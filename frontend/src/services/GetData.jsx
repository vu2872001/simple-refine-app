import { axiosWithToken } from 'common/AxiosInstance';
import routerProvider from '@pankod/refine-react-router';
import { authProvider } from './AuthProvider';
import { dataProvider } from './DataProvider';
import { notificationProvider } from './NotificationProvider';

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from 'react-toastify';
import { AntdLayout, Refine } from '@pankod/refine';
import { CustomSider } from 'components/custom';
import { Login } from 'pages/loginpage/Login';
import { Register } from 'pages/registerpage/Register';
import { UsersList, CreateUser, EditUser } from 'components/users';
import { CreatePost, EditPost, Posts } from 'components/posts';

export const GetData = () => {
  const API_URL = 'http://localhost:3000';

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            children: <Register />,
            path: '/register',
          },
          {
            children: <Login />,
            path: '/login',
          },
        ],
      }}
      notificationProvider={notificationProvider}
      dataProvider={dataProvider(API_URL, axiosWithToken)}
      resources={[
        {
          name: 'user/all',
          list: UsersList,
          // create: CreateUser,
          // edit: EditUser,
        },
        // {
        //   name: "posts",
        //   list: Posts,
        //   create: CreatePost,
        //   edit: EditPost,
        // },
      ]}
      LoginPage={Login}
      Layout={({ children }) => (
        <AntdLayout
          style={{ background: 'white', minHeight: '100vh' }}
        >
          <CustomSider />
          <AntdLayout.Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </AntdLayout.Content>
          <ToastContainer/>
        </AntdLayout>
      )}
    />
  );
};

export default GetData;
