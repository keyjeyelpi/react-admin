import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username or email is required')
    .test('username-or-email', 'Enter a valid username or email', (value) => {
      if (!value) return false;
      const isEmail = yup.string().email().isValidSync(value);
      const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);
      return isEmail || isUsername;
    }),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const RegisterSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').nullable().optional().default(null),
  phone: yup.string().nullable().optional().default(null),
  username: yup.string().required('Username '),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
