"use server"

import getCurrentUser from "@/lib/getCurrentUser";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

type UpdateProfileType = {
    name: string;
    email: string;
}

type UpdatePasswordType = {
    currentPassword: string;
    newPassword: string;
}

export async function updateProfile({ name, email }: UpdateProfileType) {
    const user = await getCurrentUser();

    if (!user) {
        return { success: false, message: "User not authenticated" };
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: name || user.name,
                email: email || user.email,
            },
        });
        return { success: true, message: "Profile updated" };
    } catch {
        return { success: false, message: "Failed to update profile" };
    }
}

export async function updatePassword({ currentPassword, newPassword }: UpdatePasswordType) {
    const user = await getCurrentUser();

    if (!user) {
        return { success: false, message: "User not authenticated" };
    }

    if (!user.hashedPassword) {
        return { success: false, message: "No password set. You signed up with an OAuth provider." };
    }

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.hashedPassword);

    if (!isCorrectPassword) {
        return { success: false, message: "Current password is incorrect" };
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: user.id },
            data: { hashedPassword },
        });
        return { success: true, message: "Password updated" };
    } catch {
        return { success: false, message: "Failed to update password" };
    }
}
