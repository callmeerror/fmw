import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/AllUsers';
import Table from '../components/Table';
import { IUser, useAuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import { AxiosError } from 'axios';
import Loading from '../components/Loading';

const AllUsers: React.FC = () => {
  const { user, authClient } = useAuthContext();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeed' | 'failed'
  >('idle');

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      setStatus('loading');
      const getAllUsers = async () => {
        try {
          const response = await authClient.get('/auth/getAllUsers');
          setUsers(response.data.users);
          setStatus('succeed');
        } catch (err) {
          const error = err as AxiosError;
          message.error((error.response!.data as any).msg);
          setStatus('failed');
        }
      };
      getAllUsers();
    }
  }, [status, authClient]);

  if (user?.role !== 'admin') return <Navigate to='/' />;

  if (status === 'idle' || status === 'loading')
    return (
      <Loading
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 120px)',
        }}
      />
    );

  return (
    <Wrapper>
      <h1>All Users</h1>
      <div className='users-container'>
        <Table
          data={users.map((user, index) => {
            return { index, ...user };
          })}
          fields={[
            {
              title: 'Name',
              key: 'name',
            },
            {
              title: 'Email',
              key: 'email',
            },
            {
              title: 'Role',
              key: 'role',
            },
          ]}
          setCurByDoubleClick={() => {}}
          setCurSelect={() => {}}
          curSelect={undefined}
        />
      </div>
    </Wrapper>
  );
};

export default AllUsers;
