import LoginForm from "@/components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) redirect("/dashboard");
  // if(!session) redirect("/choices");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
