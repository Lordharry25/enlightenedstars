import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Hardcoded secure admin credentials for demonstration layout.
        // In full production, hook up to prisma.user.findUnique
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          return { id: "1", name: "System Admin", email: "admin@example.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/en/login', // Fallback
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
