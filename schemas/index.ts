import { UserGrade, UserRole } from "@prisma/client";
import * as z from "zod";

export const ResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "must be an email",
    })
    .email({
      message: "Email is required",
    }),
});
export const NewpasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "must be an email",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
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
      message: "New password is requeried",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is requeried",
      path: ["newPassword"],
    },
  );

export const createPageSchema = z.object({
  id: z.string().optional(), // L'ID est optionnel car il sera généré automatiquement
  name: z.string().min(1, "Le nom est requis"), // Le nom ne doit pas être vide
  slug: z.string().min(1, "Le slug est requis"), // Le nom ne doit pas être vide
  content: z.string().min(1, "Le contenu est requis"), // Le contenu ne doit pas être vide
  createdAt: z.date().optional(), // Le champ est optionnel lors de la création
  updatedAt: z.date().optional(), // Le champ est optionnel lors de la création et sera géré automatiquement
});
export const updatePageSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  slug: z.optional(z.string().min(1, "Le contenu est requis")),
});

export const createEntitySchema = z.object({
  id: z.string().optional(), // L'ID est optionnel car il sera généré automatiquement
  name: z.string().min(1, "Le nom est requis"), // Le nom ne doit pas être vide
  slug: z.string().min(1, "Le slug est requis"), // Le nom ne doit pas être vide
  description: z.string().min(1, "Le slug est requis"), // Le nom ne doit pas être vide
  createdAt: z.date().optional(), // Le champ est optionnel lors de la création
  updatedAt: z.date().optional(), // Le champ est optionnel lors de la création et sera géré automatiquement
});

export const updateEntitySchema = createEntitySchema.partial();

export const createBlogpostSchema = z.object({
  id: z.string().optional(), // L'ID est optionnel car il sera généré automatiquement
  title: z.string().min(1, "Le titre est requis"), // Le titre ne doit pas être vide
  content: z.string().min(1, "Le contenu est requis"), // Le contenu ne doit pas être vide
  isPublic: z.boolean().optional().default(false), // Le champ est optionnel et par défaut false
  isReleased: z.boolean().optional().default(false), // Le champ est optionnel et par défaut false
  createdAt: z.date().optional(), // Le champ est optionnel lors de la création
  updatedAt: z.date().optional(), // Le champ est optionnel lors de la création et sera géré automatiquement
  entityId: z.string().min(1, "l'entité est requise"), // La catégorie ne doit pas être vide
});

export const updateBlogPostSchema = createBlogpostSchema;

export const createModalSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(1, "Le titre est requis"),
    content: z.string().min(1, "Le contenu est requis"),
    startDate: z.coerce.date({
      required_error: "La date de début est requise",
      invalid_type_error: "La date de début doit être une date valide",
    }),
    endDate: z.coerce.date({
      required_error: "La date de fin est requise",
      invalid_type_error: "La date de fin doit être une date valide",
    }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorer les heures pour comparer uniquement les dates

    // Vérification de startDate
    if (startDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "La date de début doit être au moins aujourd’hui",
      });
    }

    // Vérification de endDate
    if (endDate <= startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "La date de fin doit être postérieure à la date de début",
      });
    }
  });

export const updateModalSchema = createModalSchema;

export const userProfileUpdateSchema = z.object({
  firstname: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir 10 chiffres")
    .regex(
      /^[0-9]+$/,
      "Le numéro de téléphone ne doit contenir que des chiffres",
    ),
});

export const createFaqCategorySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  slug: z.string().min(1, "Le slug est requis"),
});

export const updateFaqCategorySchema = createFaqCategorySchema.partial();

export const createFaqSchema = z.object({
  question: z.string().min(1, "La question est requise"),
  answer: z.string().min(1, "La réponse est requise"),
  categoryId: z.string().min(1, "La catégorie est requise"),
  isFeatured: z.boolean().optional().default(false),
});

export const updateFaqSchema = createFaqSchema.partial();
