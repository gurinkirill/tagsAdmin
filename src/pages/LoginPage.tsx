import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions, userSliceSelector } from '@/store/slices/userSlice';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { Page } from '@/components/Page';

interface Fields {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(userSliceSelector.loginError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Fields>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!loginError) return;

    if (loginError.loginValidationError) {
      loginError.loginValidationError?.map((err) => {
        if (err.field === 'email') {
          setError('email', { message: err.message }, { shouldFocus: true });
        } else if (err.field === 'password') {
          setError('password', { message: err.message }, { shouldFocus: true });
        }
      });
    } else if (loginError.loginStandardError) {
      setError(
        'email',
        { message: loginError.loginStandardError.message },
        { shouldFocus: true }
      );
    }
  }, [loginError, setError]);

  const onSubmit = ({ email, password }: Fields) => {
    const loginAction = userSliceActions.login({
      request: {
        email,
        password,
      },
    });
    dispatch(loginAction);
  };

  return (
    <Page>
      <form
        className={'vstack space-y-2 items-center justify-center full'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={'vstack w-80'}>
          <input
            {...register('email', {
              required: 'Введите email',
            })}
            placeholder={'email'}
            className={'border-2 rounded p-1'}
          />
          {errors.email && (
            <span
              className={'text-red-500 truncate'}
              title={errors.email.message}
            >
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={'vstack w-80'}>
          <input
            {...register('password', {
              required: 'Введите пароль',
            })}
            placeholder={'password'}
            type={'password'}
            className={'border-2 rounded p-1'}
          />
          {errors.password && (
            <span
              className={'text-red-500 truncate'}
              title={errors.password.message}
            >
              {errors.password.message}
            </span>
          )}
        </div>
        <Button htmlType={'submit'}>Войти</Button>
      </form>
    </Page>
  );
};
