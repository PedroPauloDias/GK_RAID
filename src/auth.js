import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models/user"
import  bcrypt  from 'bcryptjs';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          // Verifique se é um login de visitante
          if (
            credentials.email === "visitante@example.com" &&
            credentials.password === "visitante123"
          ) {
            return {
              email: "visitante@example.com",
              role: "visitante",
              id: "visitante",
            };
          }

          const user = await User.findOne({
            email: credentials?.email
          });

          if (user) {
            const isMatch = await bcrypt.compare(
                credentials?.password,
                user?.password
            );
            if (isMatch) {
              return { ...user, role: user?.role };
            } else {
              throw new Error("invalid password");
            }
          } else {
            throw new Error("user not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          role: "user", 
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
