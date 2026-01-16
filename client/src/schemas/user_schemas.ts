import { z } from 'zod';

const loginUserSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
	password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;

export const validateLoginUserData = (user: LoginUserSchemaType) => {
    return loginUserSchema.safeParse(user); //$ This will prevent the validation from throwing an error (when you only use "schema.parse")
};



//Extending the loginUserSchema to create a registerUserSchema
const registerUserSchema = loginUserSchema.extend({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, {
            message: 'Username must be at most 20 characters long',
        }),
})

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;

export const validateRegisterUserData = (user: RegisterUserSchemaType) => {
    return registerUserSchema.safeParse(user); //$ This will prevent the validation from throwing an error (when you only use "schema.parse")
};