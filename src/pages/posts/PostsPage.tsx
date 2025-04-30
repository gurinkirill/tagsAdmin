import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postsSliceActions,
  postsSliceSelector,
} from '@/store/slices/postsSlice';
import { Page } from '@/components/Page';
import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router';
import { Path } from '@/routes/AppRoutes';

export const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSliceSelector.posts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(postsSliceActions.getPosts());
  }, [dispatch]);

  if (posts.length === 0) return <Empty className={'center-full'} />;

  return (
    <Page className={'bg-gray-50'}>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate(Path.postsCreate)}>+ Добавить</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white relative rounded-xl shadow p-4 flex flex-col space-y-2 hover:cursor-pointer hover:shadow-lg"
            onClick={() => {
              navigate(`${Path.posts}/${post.id}`);
            }}
          >
            {post.previewPicture && (
              <img
                src={post.previewPicture.url}
                alt={post.previewPicture.name}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">Автор: {post.authorName}</p>
            <p className="text-sm text-gray-500">
              Обновлено: {new Date(post.updatedAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-1">
              {post.tagNames.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};
