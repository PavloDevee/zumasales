import { z } from "zod"

export const FormSchema = (login: boolean) => z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters." }),
  password: login 
  ? z.string().min(1, { message: "Password cannot be empty." })
  : z.string()
    .min(1, { message: "Password must be at least 6 characters." }) 
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
    displayName: login
    ? z.string().optional()
    : z.string().min(2, { message: "Username must be at least 2 characters." }),
});

export const CreateFormSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  serialnumber: z.string().optional(),
  yearmake: z.string().optional(),
  condition: z.string().optional(),
  machinetype: z.string().optional(),
  custom: z.string().optional(),
  batteries: z.string().optional(),
  tires: z.string().optional(),
  pictures: z.array(
    z.object({
      img: z.instanceof(File),
      desc: z.string(),
      urlImg: z.string(),
    })
  ).optional(),
});

export const CreateLoginFormSchema = z.object({
  vendorEmail: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters." }),
  note: z.string().optional()
});

export const FormResetSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(5, { message: "Email must be at least 5 characters." }),
});

export const NameFormSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

export const FieldFormSchema = z.object({
  field: z.string().optional(),
});
