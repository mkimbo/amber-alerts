import { Metadata } from "next";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */
  return <ServerAuthProvider>{children}</ServerAuthProvider>;
}
