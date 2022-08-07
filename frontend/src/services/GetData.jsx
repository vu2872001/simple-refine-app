import axios from 'axios';
import routerProvider from '@pankod/refine-react-router';
import { authProvider } from './AuthProvider';
import { dataProvider } from './DataProvider';
import { notificationProvider } from './NotificationProvider';

import PrimasLogo from 'assets/images/PrimasLogo.png';
import 'react-toastify/dist/ReactToastify.min.css';
import { Error404, Error403 } from 'components/error';
import { ToastContainer } from 'react-toastify';
import { AntdLayout, Refine } from '@pankod/refine';
import { CustomSider } from 'components/custom';
import HomePage from 'pages/homepage/HomePage';
import { Login } from 'pages/loginpage/Login';
import { Register } from 'pages/registerpage/Register';
import { UserInfo, UsersList, } from 'pages/users';
import SetPermission from 'pages/auth/SetPermission';

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
          {
            children: <Error403 />,
            path: '/403',
          },
        ],
      }}
      notificationProvider={notificationProvider}
      dataProvider={dataProvider(API_URL, axios)}
      resources={[
        {
          name: 'user/all',
          list: UsersList,
        },
        // {
        //   name: 'permission',
        //   list: SetPermission,
        // },
        {
          name: 'user/me',
          list: UserInfo,
        },
      ]}
      catchAll={<Error404 />}
      DashboardPage={HomePage}
      LoginPage={Login}
      Layout={({ children }) => (
        <AntdLayout
          style={{ background: 'white', minHeight: '100vh' }}
        >
          <CustomSider />
          <AntdLayout.Content>
            <div style={{ padding: 24, minHeight: '100vh' }}>
              {children}
            </div>
          </AntdLayout.Content>
          <ToastContainer />
        </AntdLayout>
      )}
      Title={({ collapsed }) => (
        <div>
          {!collapsed && (
            <img
              style={{ width: '200px', padding: '20px 10px' }}
              src={PrimasLogo}
              alt="Logo"
            />
          )}
        </div>
      )}
    />
  );
};

export default GetData;

