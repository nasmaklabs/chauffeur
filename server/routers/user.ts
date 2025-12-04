import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const createUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required'),
    role: z.string().default('admin'),
});

const updateUserSchema = z.object({
    id: z.string(),
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    password: z.string().min(6).optional(),
});

export const userRouter = createTRPCRouter({
    // Create a new user
    create: publicProcedure
        .input(createUserSchema)
        .mutation(async ({ input }) => {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email: input.email },
            });

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(input.password, 10);

            const user = await prisma.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    name: input.name,
                    role: input.role,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                },
            });

            return {
                success: true,
                user,
                message: 'User created successfully',
            };
        }),

    // List all users
    list: publicProcedure.query(async () => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return users;
    }),

    // Get user by ID
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const user = await prisma.user.findUnique({
                where: { id: input.id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        }),

    // Update user
    update: publicProcedure
        .input(updateUserSchema)
        .mutation(async ({ input }) => {
            const { id, password, ...data } = input;

            // If password is provided, hash it
            const updateData: any = { ...data };
            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            const user = await prisma.user.update({
                where: { id },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    updatedAt: true,
                },
            });

            return {
                success: true,
                user,
                message: 'User updated successfully',
            };
        }),

    // Delete user
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            await prisma.user.delete({
                where: { id: input.id },
            });

            return {
                success: true,
                message: 'User deleted successfully',
            };
        }),

    // Get user count
    count: publicProcedure.query(async () => {
        const count = await prisma.user.count();
        return count;
    }),

    // Change password (for logged-in user)
    changePassword: publicProcedure
        .input(z.object({
            currentPassword: z.string().min(6),
            newPassword: z.string().min(6, 'New password must be at least 6 characters'),
            email: z.string().email(),
        }))
        .mutation(async ({ input }) => {
            // Get user by email
            const user = await prisma.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Verify current password
            const passwordsMatch = await bcrypt.compare(input.currentPassword, user.password);
            if (!passwordsMatch) {
                throw new Error('Current password is incorrect');
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(input.newPassword, 10);

            // Update password
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            });

            return {
                success: true,
                message: 'Password changed successfully',
            };
        }),
});

