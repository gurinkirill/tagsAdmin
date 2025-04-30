import React, { useEffect } from 'react';
import { Page } from '@/components/Page';
import { Button, Form, Input, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import {
  postsSliceActions,
  postsSliceSelector,
} from '@/store/slices/postsSlice';
import {
  authorsSliceActions,
  authorsSliceSelector,
} from '@/store/slices/authorsSlice';
import { tagsSliceActions, tagsSliceSelector } from '@/store/slices/tagsSlice';
import { useNavigate, useParams } from 'react-router';
import { EditPostRequest } from '@/api/services/postsApi';
import { Path } from '@/routes/AppRoutes';

export const PostEditPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [form] = Form.useForm<EditPostRequest>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const post = useSelector(postsSliceSelector.postDetails);
  const authors = useSelector(authorsSliceSelector.authors);
  const tags = useSelector(tagsSliceSelector.tags);

  useEffect(() => {
    dispatch(tagsSliceActions.getTags());
    dispatch(authorsSliceActions.getAuthors());
    dispatch(
      postsSliceActions.getPostDetails({ request: { id: Number(postId) } })
    );
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        authorId: post.author?.id,
        tagIds: post.tags?.map((tag) => tag.id),
        text: post.text,
        previewPicture: undefined,
      });
    }
  }, [post, form]);

  const handleFinish = (values: EditPostRequest) => {
    dispatch(
      postsSliceActions.editPost({
        request: {
          ...values,
          id: Number(postId),
        },
      })
    );
    navigate(`${Path.posts}/${postId}`);
  };

  return (
    <Page>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Заголовок" name="title">
          <Input defaultValue={post?.title} />
        </Form.Item>

        <Form.Item label="Автор" name="authorId">
          <Select defaultValue={post?.author?.id} placeholder="Выберите автора">
            {authors.map((author) => (
              <Select.Option key={author.id} value={author.id}>
                {author.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Теги" name="tagIds">
          <Select
            defaultValue={post?.tags?.map((tag) => tag.id)}
            mode="multiple"
            placeholder="Выберите теги"
          >
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Текст" name="text">
          <TextArea defaultValue={post?.text} rows={6} />
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
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Page>
  );
};
