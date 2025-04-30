import React, { useEffect } from 'react';
import { Page } from '@/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { tagsSliceActions, tagsSliceSelector } from '@/store/slices/tagsSlice';
import { ColumnsType } from 'antd/es/table';
import { TagsItem } from '@/api/services/tagsApi';
import { Button, Table } from 'antd';

const columns: ColumnsType<TagsItem> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
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

export const TagsPage: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(tagsSliceSelector.tags);

  useEffect(() => {
    dispatch(tagsSliceActions.getTags());
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
        dataSource={tags}
        pagination={false}
      />
    </Page>
  );
};
