import { newPassword } from '@/actions/new-password';
import { UserGrade, UserRole } from '@prisma/client';
import * as z from 'zod';

export const ResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'must be an email',
    })
    .email({
      message: 'Email is required',
    }),
});
export const NewpasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
});
export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'must be an email',
    })
    .email({
      message: 'Email is required',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    grade: z.enum([
      UserGrade.ADMIN,
      UserGrade.MANAGER,
      UserGrade.MODERATOR,
      UserGrade.NONE,
    ]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'New password is requeried',
      path: ['password'],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is requeried',
      path: ['newPassword'],
    }
  );
