import React, { useEffect } from 'react';
import { Page } from '@/components/Page';
import { Button, Form, Input, Select, Upload } from 'antd';
import { EditPostRequest } from '@/api/services/postsApi';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorsSliceActions,
  authorsSliceSelector,
} from '@/store/slices/authorsSlice';
import { tagsSliceActions, tagsSliceSelector } from '@/store/slices/tagsSlice';
import { useNavigate } from 'react-router';
import { Path } from '@/routes/AppRoutes';
import { postsSliceActions } from '@/store/slices/postsSlice';

export const PostCreatePage: React.FC = () => {
  const [form] = Form.useForm<EditPostRequest>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authors = useSelector(authorsSliceSelector.authors);
  const tags = useSelector(tagsSliceSelector.tags);

  useEffect(() => {
    dispatch(tagsSliceActions.getTags());
    dispatch(authorsSliceActions.getAuthors());
  }, [dispatch]);

  const handleFinish = (values: EditPostRequest) => {
    dispatch(
      postsSliceActions.addPost({
        request: {
          ...values,
        },
      })
    );
    navigate(Path.posts);
  };

  return (
    <Page className={'items-center'}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Заголовок" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Автор" name="authorId">
          <Select placeholder="Выберите автора">
            {authors.map((author) => (
              <Select.Option key={author.id} value={author.id}>
                {author.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Теги" name="tagIds">
          <Select mode="multiple" placeholder="Выберите теги">
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Текст" name="text">
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item label="Превью" name="previewPicture" valuePropName="file">
          <Upload
            onChange={({ file }) => {
              form.setFieldsValue({
                previewPicture: file,
              });
            }}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button>Загрузить файл</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Page>
  );
};
