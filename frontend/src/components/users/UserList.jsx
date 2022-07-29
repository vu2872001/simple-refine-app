import {
  Button,
  List,
  Table,
  Typography,
  EditButton,
  Space,
  DeleteButton,
  useTable,
  useLogout,
  usePermissions,
  useGetIdentity,
  useNavigation,
} from '@pankod/refine';
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "pages/loginpage/LoginService";
import CreateUserModal from "components/custom/CreateUserModal";
import UpdateUserModal from "components/custom/UpdateUserModal";
import { deleteUser } from "./UserListService";
import DeleteModal from "components/custom/DeleteModal";

export const UsersList = () => {
  const { data: identity } = useGetIdentity();
  const { data: permissionsData } = usePermissions();
  const { push } = useNavigation();
  const { mutate: logout, isLoading } = useLogout();
  const { tableProps } = useTable();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth.login);
  const handleLogout = async () => {
    const token = currentUser.access;
    await logoutAuth(token, dispatch);
    logout();
  };

  if(identity!=="Admin") push("/403");

  const { tableProps } = useTable({
    initialSorter: [
      {
        field: "id",
        order: "asc",
      },
    ],
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
        Simple Users Management
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        {/* <Typography
          style={{
            fontSize: "1.2rem",
          }}
        >
          <img
            style={{ marginRight: "1rem", height: "60px" }}
            src={
              identity === "Admin"
                ? "https://iconarchive.com/download/i91958/icons8/windows-8/Users-Administrator-2.ico"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-QBaCgmJMTArP6E3KYOR6yN7LXXwXqCai5bGQqyCNyLEG_SapYTkGkDTmcVoDZXlQv-o&usqp=CAU"
            }
            alt="avt"
          />
          Welcome <span style={{ color: "#67be23" }}> {identity}!</span>
        </Typography>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
          onClick={handleLogout}
        >
          Sign out
        </Button> */}
      </div>
      <List title="Users List">
        <CreateUserModal />
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="email" title="Email" sorter />
          <Table.Column dataIndex="name" title="Name" sorter />
          <Table.Column dataIndex="username" title="Username" sorter />
          <Table.Column dataIndex="age" title="Age" sorter />
          <Table.Column dataIndex="role" title="Role" sorter />
          { <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <UpdateUserModal data={record}/>
                {permissionsData?.includes("DeleteUser") && (
                  <DeleteModal data={record}/>
                 
                )}
              </Space>
            )}
          /> }
        </Table>
      </List>
    </div>
  );
};

export default UsersList;
