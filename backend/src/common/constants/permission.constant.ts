import AdminPermission from './role/admin.permission';
import UserPermission from './role/user.permission';

const Permission = {
  ...UserPermission,
  ...AdminPermission,
};

type Permission = UserPermission | AdminPermission;

export default Permission;
