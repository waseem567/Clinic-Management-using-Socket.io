import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Doctor from "@/models/doctor";
import Patient from "@/models/patient"
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await Doctor.findOne({ email });
          console.log(user)
          if (user) {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
              return null;
            }
            return user;
          }
          const patient = await Patient.findOne({ email });
          const passwordsMatch = await bcrypt.compare(password, patient.password);
          if (!passwordsMatch) {
            return null;
          }
          return patient;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
callbacks: {
  async session({session}){
    const loggedInUser = await Doctor.findOne({email:session.user.email});
    if(loggedInUser){
      session.user.loggedUser = loggedInUser;
      session.user.isDoctor = true;
      return session;
    };
    const patient = await Patient.findOne({email:session.user.email});
    if(patient){
      console.log("server => ", patient)
      session.user.loggedUser = patient;
      session.user.isDoctor = false;
      return session;
    }
  }
}
  ,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };