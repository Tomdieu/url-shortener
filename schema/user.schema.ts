import {z} from "zod"

export const userSchema = z.object({
    name:z.string().optional(),
    email:z.string(),
    password:z.string().optional(),
    confirmPassword:z.string().optional()
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);


export type UserType = z.infer<typeof userSchema>