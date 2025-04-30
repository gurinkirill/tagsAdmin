import React, { useEffect } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { userSliceSelector } from '@/store/slices/userSlice';
import { AuthorsPage } from '@/pages/AuthorsPage';
import { TagsPage } from '@/pages/TagsPage';
import { PostsPage } from '@/pages/posts/PostsPage';
import { PostPage } from '@/pages/posts/PostPage';
import { PostEditPage } from '@/pages/posts/PostEditPage';
import { PostCreatePage } from '@/pages/posts/PostCreatePage';

export const Path = {
  authors: '/authors',
  tags: '/tags',
  posts: '/posts',
  postsEdit: '/posts/edit',
  postsCreate: '/posts/create',
  login: '/login',
};

export const AppRoutes: React.FC = () => {
  const isLogin = useSelector(userSliceSelector.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.login);
    }
  }, [isLogin, navigate]);

  return (
    <Routes>
      <Route
        path={Path.login}
        element={isLogin ? <Navigate to={Path.posts} /> : <LoginPage />}
      />
      <Route path="*" element={<Navigate to={Path.posts} />} />

      <Route path={Path.authors} element={<AuthorsPage />} />
      <Route path={Path.tags} element={<TagsPage />} />
      <Route path={Path.posts} element={<PostsPage />} />
      <Route path={`${Path.posts}/:postId`} element={<PostPage />} />
      <Route path={`${Path.postsEdit}/:postId`} element={<PostEditPage />} />
      <Route path={`${Path.postsCreate}`} element={<PostCreatePage />} />
    </Routes>
  );
};
