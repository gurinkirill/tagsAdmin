import React, { useEffect } from 'react';
import { Page } from '@/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorsSliceActions,
  authorsSliceSelector,
} from '@/store/slices/authorsSlice';
import { ColumnsType } from 'antd/es/table';
import { AuthorsItem } from '@/api/services/authorsApi';
import { Avatar, Button, Table } from 'antd';

const columns: ColumnsType<AuthorsItem> = [
  {
    title: 'Аватар',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) =>
      avatar?.url ? (
        <Avatar src={avatar.url} alt={avatar.name} />
      ) : (
        <div>Нет фото</div>
      ),
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Обновлён',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date) => new Date(date).toLocaleString(),
  },
  {
    title: 'Создан',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => new Date(date).toLocaleString(),
  },
  {
    title: 'Действия',
    key: 'actions',
    width: 120,
    render: () => (
      <Button size="small" disabled title={'В разработке'}>
        Редактировать
      </Button>
    ),
  },
];

export const AuthorsPage: React.FC = () => {
  const dispatch = useDispatch();
  const authors = useSelector(authorsSliceSelector.authors);

  useEffect(() => {
    dispatch(authorsSliceActions.getAuthors());
  }, [dispatch]);

  return (
    <Page>
      <div className="flex justify-end mb-4">
        <Button disabled title={'В разработке'}>
          + Добавить
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={authors}
        pagination={false}
      />
    </Page>
  );
};
