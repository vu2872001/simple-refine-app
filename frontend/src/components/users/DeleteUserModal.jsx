import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { Icons } from '@pankod/refine';
import { deleteUser } from 'components/users/UserService';

function DeleteUserModal({ data }) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    await deleteUser(data.id, dispatch);
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    window.location.reload(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <div
        style={{
          padding: '0px 3px',
          border: '1px solid',
          borderRadius: '6px',
          color: 'orange',
        }}
      >
        <Icons.RestOutlined type="primary" onClick={showModal} />
      </div>
      <Modal
        title="Confirm delete user"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: '200px' }}
      >
        <p>Are you sure you want to delete user: {data.email}</p>
      </Modal>
    </>
  );
}

export default DeleteUserModal;
