import { faker } from '@faker-js/faker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Collapse, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TbEye, TbEyeClosed, TbMail, TbPassword, TbUser } from 'react-icons/tb';
import Tabs from '../components/tabs.component';
import {
  LoginSchema,
  RegisterSchema,
  iLoginSchema,
  iRegisterSchema,
} from '../schema/authenticate.schema';
import { useAppDispatch, useAppSelector } from '../store';
import { setUserProfile } from '../store/slices/user.slice';
import ProfilePicture from '../assets/images/profile-picture.png';

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<iLoginSchema>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: 'k.penaloza@keyjeyelpi.com',
      password: 'keyjeyelpi',
    },
  });

  const onSubmit = (data: iLoginSchema) => {
    const profile =
      data?.email === 'k.penaloza@keyjeyelpi.com'
        ? {
            email: data?.email,
            name: {
              first: 'Kim Joseph',
              last: 'Peñaloza',
              middle: 'Luno',
            },
            avatar: ProfilePicture,
            number: faker.phone.number(),
            birthdate: faker.date.past().toISOString(),
          }
        : {
            email: data?.email,
            name: {
              first: faker.person.firstName(),
              last: faker.person.lastName(),
              middle: faker.person.middleName(),
            },
            avatar: faker.image.avatar(),
            number: faker.phone.number(),
            birthdate: faker.date.past().toISOString(),
          };

    dispatch(setUserProfile(profile));
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
      <Button type="submit" variant="contained" size="small" fullWidth>
        Login
      </Button>
    </Stack>
  );
};

const Register = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<iRegisterSchema>({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: iRegisterSchema) => {
    dispatch(
      setUserProfile({
        email: data?.email,
        name: {
          first: data.firstName,
          last: data.lastName,
          middle: faker.person.middleName(),
        },
        avatar: faker.image.avatar(),
        number: data.phone || faker.phone.number(),
        birthdate: faker.date.past().toISOString(),
      }),
    );
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
      <Button type="submit" variant="contained" size="small" fullWidth>
        Register
      </Button>
    </Stack>
  );
};

const Authenticate = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const tabs = [
    {
      title: 'Login',
      content: <Login />,
    },
    {
      title: 'Register',
      content: <Register />,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]?.title);

  useLayoutEffect(() => {
    if (!user?.id) return;

    navigate('/');
  }, [user]);

  return (
    <Stack gap={2} alignItems="center" justifyContent="center">
      <Stack alignItems="center">
        <Collapse in={selectedTab === tabs[0]?.title}>
          <Typography variant="h5" fontWeight={700}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please login to your account
          </Typography>
        </Collapse>
        <Collapse in={selectedTab === tabs[1]?.title}>
          <Typography variant="h5" fontWeight={700}>
            Welcome!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please register to continue
          </Typography>
        </Collapse>
      </Stack>
      <Stack gap={2} alignItems="center">
        <Tabs
          tabs={tabs.map(({ title }) => title)}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <AnimatePresence mode="wait">
          {tabs.map(({ title, content }) => {
            return (
              title === selectedTab && (
                <Box
                  component={motion.div}
                  key={title}
                  initial={{
                    filter: 'blur(16px)',
                    height: 0,
                  }}
                  animate={{
                    filter: 'blur(0px)',
                    height: 'auto',
                  }}
                  exit={{
                    filter: 'blur(16px)',
                    height: 0,
                  }}
                >
                  {content}
                </Box>
              )
            );
          })}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default Authenticate;
