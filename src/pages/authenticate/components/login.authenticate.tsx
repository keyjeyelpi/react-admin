import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schema/authenticate.schema';
import { useAppDispatch } from '@/store';
import { setUserProfile } from '@/store/slices/user.slice';
import { useLoginMutation } from '@/api';
import type { LoginSchemaType } from '@/schema/types';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { TbEye, TbEyeClosed, TbMail, TbPassword } from 'react-icons/tb';

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        setUserProfile({
          email: response.user.email,
          name: response.user.name,
          avatar: response.user.avatar,
          number: response.user.number,
          birthdate: response.user.birthdate,
        }),
      );
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: error?.data?.message || 'Login failed. Please try again.',
      });
    }
  };

  const onError = () => {};

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit, onError)}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="keyjeyelpi@sample.com"
        error={!!errors?.email}
        helperText={errors?.email?.message}
        {...register('email')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TbMail />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        size="small"
        type={togglePassword ? 'text' : 'password'}
        error={!!errors?.password}
        helperText={errors?.password?.message}
        {...register('password')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TbPassword />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setTogglePassword(!togglePassword)}
              sx={{
                cursor: 'pointer',
              }}
            >
              {!togglePassword ? <TbEyeClosed /> : <TbEye />}
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" size="small" fullWidth disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Stack>
  );
};

export default Login;
