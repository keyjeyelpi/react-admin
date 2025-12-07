import { LoginSchema, RegisterSchema } from './authenticate.schema';

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;
export type RegisterSchemaType = yup.InferType<typeof RegisterSchema>;
