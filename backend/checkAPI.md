[v] {/auth/register, POST} route +2ms
 	- throw error exist
 	- Create new success
-----------------------------------------------------------
[x] {/auth/login, POST} route +1ms
 	- throw Unauthorized if error
 	- Return 2 token
-----------------------------------------------------------
[x] {/auth/logout, POST} route +1ms
 	- Delete Cookie + DB
-----------------------------------------------------------
[x] {/auth/refresh, GET} route +0ms
-----------------------------------------------------------
[x] {/user/all, GET} route +1ms
	- Forbiden resource if not role
	- Return right data	
-----------------------------------------------------------
[x] {/user/me, GET} route +0ms
	- Throw error when use old token or not right token
	- Return right data
-----------------------------------------------------------
[x] {/user/:id, GET} route +1ms
	- Forbiden resource if not role
	- Return right data
-----------------------------------------------------------
[x] {/user/update/:id, PUT} route +0ms
	- Forbiden resource if not role
	- Return right data
-----------------------------------------------------------
[x] {/user/me/update, PUT} route +2ms
	- Throw error if same email
	- Update Success
-----------------------------------------------------------
[x] {/user/update/password, POST} route +1ms
	- Throw error if wrong old password
	- Throw error if not same comfirm password
	- Update Success
-----------------------------------------------------------
[x] {/user/delete/:id, DELETE} route +1ms
	- Forbiden resource if not role
	- Soft Delete
	- Cannot login again
	- Cannot delete again
-----------------------------------------------------------
[x] {/user/restore/:id, PUT} route +0ms
	- Forbiden resource if not role
	- Restore Success
-----------------------------------------------------------
[x] {/role/all, GET} route +0ms
	- Forbiden resource if not role
	- Get sucess
-----------------------------------------------------------
[x] {/role/create, POST} route +0ms
	- Forbiden resource if not role
	- Create Success
-----------------------------------------------------------
[x] {/role/:id/delete, DELETE} route +1ms
	- Forbiden resource if not role
	- Delete Success
	- Cannot delete if deleted
-----------------------------------------------------------
[x] {/role/:id/restore, POST} route +0ms
	- Forbiden resource if not role
	- Restore Success
	- Cannot restore if existed
-----------------------------------------------------------
[x] {/role/:id/permission, GET} route +1ms
	- Forbiden resource if not role
	- Get Success
-----------------------------------------------------------
[x] {/role/:id/create, POST} route +0ms
	- Forbiden resource if not role
	- Set Data Success
	- Cannot set data if existed
-----------------------------------------------------------
[x] {/role/:id/delete-permission, DELETE} route +1ms
	- Forbiden resource if not role
	- Delete Success
	- Cannot delete if deleted
-----------------------------------------------------------
[x] {/permission/all, GET} route +1ms
	- Forbiden resource if not role
	- Get Success
-----------------------------------------------------------
[x] {/permission/my-permissions, GET} route +0ms
	- Get Success
-----------------------------------------------------------
[x] {/permission/create, POST} route +1ms
	- Forbiden resource if not role
	- Create Success
-----------------------------------------------------------
[x] {/permission/:id/delete, DELETE} route +0ms
	- Forbiden resource if not role
	- Delete Success
	- Cannot delete if deleted
-----------------------------------------------------------
[x] {/permission/:id/restore, POST} route +1ms
	- Forbiden resource if not role
	- Restore Success
	- Cannot restore if existed