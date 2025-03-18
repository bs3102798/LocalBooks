import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

if(!process.env.GOOGLE_CLIENT_ID) {
    throw 'google client id is missing';
}

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }),

    ]

};

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }