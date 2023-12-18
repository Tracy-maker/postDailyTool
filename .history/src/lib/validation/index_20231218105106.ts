import * as z from "zod";

export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  name: z.string().min(2, { message: "Too short" }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});

//forget password page
export const ResetPasswordValidation = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Password do not match",
    path: ["repeatNewPassword"],
  });

export const ValidEmail = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
