import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        // 🔐 Email + Password (Credentials)
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email.toLowerCase();
                const user = await prisma.users.findUnique({
                    where: { email },
                });
                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValid) return null;

                return { id: user.id, name: user.name, email: user.email };
            },
        }),

        // 🌐 Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // 🐙 GitHub OAuth
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],

    // 🔑 Use JWT strategy for sessions
    session: { strategy: "jwt" },

    // 🌍 Custom auth pages (optional)
    pages: {
        signIn: "/auth/login", // redirect users here for login
        error: "/auth/error", // optional: custom error page
    },

    // 🔧 Callbacks
    callbacks: {
        async jwt({ token, user }) {
            // First time login: `user` is defined
            if (user) {
                token.id = (user as any).id;
                token.name = (user as any).name;
                token.email = (user as any).email;

                // Fetch roles from DB if not already present
                const dbUser = await prisma.users.findUnique({
                    where: { id: token.id as string },
                    include: {
                        userrole: {
                            include: { role: true },
                        },
                    },
                });

                token.roles = dbUser?.userrole.map((ur) => ur.role.name) || [];
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id;
            }
            return session;
        },
        async signIn({ user, account, profile, credentials }) {
            const email = user.email?.toLowerCase();
            if (!email) return false;

            // --- 1️⃣ Check if user exists ---
            let dbUser = await prisma.users.findUnique({ where: { email } });

            if (!dbUser) {
                // --- 2️⃣ If user does not exist → create default role ---
                let defaultRole = await prisma.role.findUnique({
                    where: { name: "user" },
                });

                if (!defaultRole) {
                    defaultRole = await prisma.role.create({
                        data: {
                            name: "user",
                            description: "Default role for new users",
                        },
                    });
                }

                // --- 3️⃣ Create the user ---
                dbUser = await prisma.users.create({
                    data: {
                        name: user.name || "Anonymous",
                        email,
                        password: "", // no password for OAuth users
                        image: user.image || null,
                    },
                });

                // --- 4️⃣ Assign role ---
                await prisma.userrole.create({
                    data: {
                        role_id: defaultRole.id,
                        user_id: dbUser.id,
                    },
                });
            }

            // --- 5️⃣ Ensure account record exists ---
            if (account) {
                const existingAccount = await prisma.accounts.findFirst({
                    where: {
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    },
                });

                if (!existingAccount) {
                    await prisma.accounts.create({
                        data: {
                            userId: dbUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            refresh_token: account.refresh_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                            session_state: account.session_state,
                        },
                    });
                }
            }

            return true;
        },
    },

    // 🔒 Required for JWT encryption
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
