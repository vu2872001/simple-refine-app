
import React from "react";
import {
  Button,
  List,
  Table,
  ImageField,
  Typography,
  EditButton,
  Space,
  DeleteButton,
  useTable,
  useLogout,
  usePermissions,
  useGetIdentity,
  useMany,
} from "@pankod/refine";

export const Posts = () => {
  const { data: identity } = useGetIdentity();
  const { data: permissionsData } = usePermissions(); 
  const { mutate: logout, isLoading } = useLogout();
  
  const { tableProps } = useTable({
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  });

  const postid = tableProps?.dataSource?.map((item) => item.id) ?? [];
  const { data: usersData } = useMany({
    resource: "posts",
    ids: postid,
    queryOptions: {
        enabled: postid.length > 0,
    },
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
        Simple Posts Management
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1.5rem",
        }}
      >
        <Typography
          style={{
            fontSize: "1.2rem",
          }}
        >
          <img
            style={{ marginRight: "1rem", height: "60px", }}
            src={permissionsData?.includes("admin")?"https://cf.shopee.vn/file/e68a57f20e1889c54ee32e050cf69c43":"https://i.pinimg.com/236x/b4/f1/f1/b4f1f19330a0542e69f1ea8c92ced4fc.jpg"}
            alt="avt"
          />
          Welcome <span style={{ color: "#67be23" }}> {identity}!</span>
        </Typography>
        {/* <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
          onClick={() => logout()}
        >
          Sign out
        </Button> */}
      </div>
      <List canCreate = {permissionsData?.includes("admin")} isLoading={true}>
        <Table {...tableProps} rowKey="id">
          <Table.Column 
            dataIndex={["id"]}
            title="Image"
            // render={(value) => {
            //   const data = usersData?.data.find((item) => item.id === value)?.avatar;
            //   if(!data) return <div>Loading...</div>
            //   return <img style={{width: "60px"}} src={data?data[0].url:"https://i.pinimg.com/236x/b4/f1/f1/b4f1f19330a0542e69f1ea8c92ced4fc.jpg"} alt="Avatar"/>
            // }}
            render={(_, record) => ( 
              <ImageField 
                value={record.image?record.image[0].url:"https://pbs.twimg.com/media/Cimc3oVWkAIMye1.jpg"} 
                title={""} 
                width={60}
              />
            )}        
          />
          <Table.Column dataIndex="title" title="Title" sorter />
          <Table.Column dataIndex="content" title="Content" sorter />
          <Table.Column dataIndex="status" title="Status" sorter />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
            <Space>
              <EditButton
                size="small"
                 hideText
                 recordItemId={record.id}
              />
              {permissionsData?.includes("admin") && 
              <DeleteButton
                size="small"
                recordItemId={record.id}
                hideText
              />
              }
            </Space>
            )}
          />
        </Table>
      </List>
    </div>
  );
};

export default Posts;
