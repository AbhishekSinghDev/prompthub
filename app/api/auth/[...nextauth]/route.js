import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        // user already exists
        // if not, create a new user
        const userExits = await User.findOne({ email: profile.email });

        if (!userExits) {
          const newUser = new User({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });

          await newUser.save();
        }
        return true; // solves issue of access denied
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export { handler as GET, handler as POST };
