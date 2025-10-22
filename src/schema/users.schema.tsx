import * as yup from 'yup';

export const createUserSchema = yup.object({
  country: yup.string().required('Country is required'),
  account_type_id: yup.string().required('Account type is required'),
  lastname: yup.string().required('Last name is required'),
  firstname: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  contactnumber: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, 'Invalid Philippine contact number format')
    .required('Contact number is required'),
});

export type iCreateUserSchema = yup.InferType<typeof createUserSchema>;
