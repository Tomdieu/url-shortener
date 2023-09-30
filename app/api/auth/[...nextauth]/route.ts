import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/lib/prismadb";


import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,

            profile(profile: GithubProfile) {
                return { ...profile, id: profile.id.toString(), image: profile.avatar_url }
            }


        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'name@domain.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '******'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid Credentials');
                }

                // check password match

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Invalid Credentials');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/api/auth/signin',

        signOut: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",

    },
    secret: process.env.NEXTAUTH_SCRET,
    
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }