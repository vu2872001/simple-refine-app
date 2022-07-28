import UserPermission from '../../user/permission/user.permission';
import ProductPermission from '../../product/permission/product.permission';

const Permission = {
  ...UserPermission,
  ...ProductPermission,
};

type Permission = UserPermission | ProductPermission;

export default Permission;
