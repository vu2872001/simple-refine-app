
import {
  List,
  Table,
  Typography,
  Space,
  useTable,
  usePermissions,
  useGetIdentity,
  useNavigation,
} from '@pankod/refine';
import CreateUserModal from './CreateUserModal';
import UpdateUserModal from './UpdateUserModal';
import DeleteUserModal from './DeleteUserModal';

export const UsersList = () => {
  const { data: identity } = useGetIdentity();
  const { data: permissionsData } = usePermissions();
  const { push } = useNavigation();

  if (identity !== 'Admin') push('/403');

  const { tableProps } = useTable({
    initialSorter: [
      {
        field: 'id',
        order: 'asc',
      },
    ],
  });

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
        Simple Users Management
      </Typography>
      <List title="Users List">
        <CreateUserModal />
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column dataIndex="username" title="Username" />
          <Table.Column dataIndex="age" title="Age" />
          <Table.Column dataIndex="role" title="Role" />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <UpdateUserModal data={record} />
                {permissionsData?.includes('DeleteUser') && (
                  <DeleteUserModal data={record} />
                )}
              </Space>
            )}
          />
        </Table>
      </List>
    </div>
  );
};

export default UsersList;

