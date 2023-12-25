import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from '@utils/database'
import User from '@models/userModels'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({session, token}) {
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString();
      session.accessToken = token.accessToken
      sessionUser.token = session.accessToken

      sessionUser.save();
      return session;

    },

    async signIn({profile}) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email
        })

        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
            token: ''
          })
        }

        return true
      } catch (error) {
        console.log('here' + error);
        return false
      }
    },

    async jwt({token, account, profile}) {

      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
    }

})

export {handler as GET, handler as POST}