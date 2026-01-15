import { z } from 'zod';

const userSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(15, {
			message: 'Username must be at most 15 characters long',
		}),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
	email: z.email({ message: 'Invalid email address' }),
});

export type UserSchema = z.infer<typeof userSchema>;

export const validateUser = (user: UserSchema) => {
	return userSchema.safeParse(user); //$ This will prevent the validation from throwing an error (when you only use "schema.parse")
};
