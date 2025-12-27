import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/schema/authenticate.schema';
import { useAppDispatch } from '@/store';
import { setUserProfile } from '@/store/slices/user.slice';
import { useRegisterMutation } from '@/api';
import type { RegisterSchemaType } from '@/schema/types';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { TbEye, TbEyeClosed, TbMail, TbPassword, TbUser } from 'react-icons/tb';

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        name: {
          first: data.firstName,
          last: data.lastName,
        },
      }).unwrap();

      dispatch(
        setUserProfile({
          email: response.email,
          name: response.name,
          avatar: response.avatar,
          number: response.number,
          birthdate: response.birthdate,
        }),
      );
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: error?.data?.message || 'Registration failed. Please try again.',
      });
    }
  };

  const onError = () => {};

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit, onError)}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Kim Joseph"
        error={!!errors?.firstName}
        helperText={errors?.firstName?.message}
        {...register('firstName')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TbUser />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        size="small"
        placeholder="Peñaloza"
        error={!!errors?.lastName}
        helperText={errors?.lastName?.message}
        {...register('lastName')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TbUser />
            </InputAdornment>
          ),
        }}
      />
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
        placeholder="Password"
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
      <TextField
        variant="outlined"
        size="small"
        placeholder="Confirm Password"
        type={toggleConfirmPassword ? 'text' : 'password'}
        error={!!errors?.confirmPassword}
        helperText={errors?.confirmPassword?.message}
        {...register('confirmPassword')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TbPassword />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
              sx={{
                cursor: 'pointer',
              }}
            >
              {!toggleConfirmPassword ? <TbEyeClosed /> : <TbEye />}
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" size="small" fullWidth disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Stack>
  );
};

export default Register;
