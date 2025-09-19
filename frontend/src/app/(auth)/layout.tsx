import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "MUSIC GENERATOR - Authentication",
  description: "MUSIC GENERATOR Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh flex-col">
      {children}
    </div>
  );
}
