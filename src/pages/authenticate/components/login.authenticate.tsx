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
import { createSignature, DEMO_MODE } from '@/utils/function.util';
import { encrypt } from '@/utils/encryption.util';

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
    defaultValues: DEMO_MODE
      ? {
          username: 'keyjeyelpi',
          password: 'keyjeyelpi',
        }
      : {
          username: '',
          password: '',
        },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const loginData = {
        username: data.username,
        password: encrypt(data.password),
      };

      const response = await login({
        ...loginData,
        signature: createSignature(loginData),
      }).unwrap();
      console.log('Login Response:', response);

      dispatch(
        setUserProfile({
          name: {
            first: response.data.firstname,
            last: response.data.lastname,
            middle: '',
          },
          avatar: response.data.photo || undefined,
          number: response.data.contactnumber,
          birthdate: undefined, // Not provided in new format
        }),
      );
    } catch (error: any) {
      console.log(error);
      setError('username', {
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
        error={!!errors?.username}
        helperText={errors?.username?.message}
        {...register('username')}
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
