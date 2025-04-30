import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  postsSliceActions,
  postsSliceSelector,
} from '@/store/slices/postsSlice';
import { Avatar, Button, Popconfirm } from 'antd';
import { Page } from '@/components/Page';
import { Path } from '@/routes/AppRoutes';

export const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const post = useSelector(postsSliceSelector.postDetails);

  useEffect(() => {
    dispatch(
      postsSliceActions.getPostDetails({ request: { id: Number(postId) } })
    );
  }, [dispatch, postId]);

  if (!post) return;

  return (
    <Page>
      <div className={'self-end vstack space-y-2'}>
        <Button onClick={() => navigate(`${Path.postsEdit}/${post.id}`)}>
          Редактировать
        </Button>
        <Popconfirm
          title="Удалить пост?"
          description="Это действие необратимо"
          onConfirm={() => {
            dispatch(
              postsSliceActions.removePost({
                request: { id: Number(postId) },
              })
            );
            navigate(Path.posts);
          }}
          okText="Да"
          cancelText="Нет"
        >
          <Button danger>Удалить</Button>
        </Popconfirm>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {post.previewPicture?.url && (
          <img
            src={post.previewPicture.url}
            alt={post.previewPicture.name}
            className="w-full h-64 object-cover rounded"
          />
        )}
        <h1 className="text-3xl font-bold">{post.title}</h1>
        {post.author && (
          <div className="flex items-center space-x-2">
            {post.author.avatar?.url && (
              <Avatar src={post.author.avatar.url} alt={post.author.fullName} />
            )}
            <span className="text-lg">{post.author.fullName}</span>
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          Создан: {new Date(post.createdAt).toLocaleString()} | Обновлён:{' '}
          {new Date(post.updatedAt).toLocaleString()}
        </div>
        <div className="whitespace-pre-wrap">{post.text}</div>
      </div>
    </Page>
  );
};
