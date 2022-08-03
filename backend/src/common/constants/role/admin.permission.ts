enum AdminPermission {
  AddPermission = 'AddPermission',
  DeletePermission = 'DeletePermission',
  RestorePermission = 'RestorePermission',
  ViewAllPermissions = 'ViewAllPermissions',

  AddRole = 'AddRole',
  DeleteRole = 'DeleteRole',
  RestoreRole = 'RestoreRole',
  ViewAllRole = 'ViewAllRole',

  GetPermissionByRole = 'GetPermissionByRole',
  SetPermissionToRole = 'SetPermissionToRole',
  RemovePermissionOfRole = 'RemovePermissionOfRole',

  ViewUserDetails = 'ViewUserDetails',

  EditUser = 'EditUser',
  DeleteUser = 'DeleteUser',
  RestoreUser = 'RestoreUser',
  ViewAllUser = 'ViewAllUser',
}

export default AdminPermission;
