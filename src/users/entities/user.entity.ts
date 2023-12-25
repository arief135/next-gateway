import { User } from "@prisma/client";

export interface UserCreateEntity extends User {
    password: string,
    role: string
}