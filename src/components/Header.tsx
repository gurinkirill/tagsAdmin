import React from 'react';
import { useNavigate } from 'react-router';
import { Path } from '@/routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions, userSliceSelector } from '@/store/slices/userSlice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(userSliceSelector.isLogin);

  if (!isLogin) return null;

  return (
    <div
      className={
        'flex w-full relative min-h-16 h-16 text-white bg-custom-header items-center justify-center shadow-lg'
      }
    >
      <div className={'flex space-x-10 h-full'}>
        <button onClick={() => navigate(Path.authors)}>Авторы</button>
        <button onClick={() => navigate(Path.tags)}>Теги</button>
        <button onClick={() => navigate(Path.posts)}>Посты</button>
      </div>
      <button
        className={'absolute right-4'}
        onClick={() => dispatch(userSliceActions.logout())}
      >
        Выйти
      </button>
    </div>
  );
};
