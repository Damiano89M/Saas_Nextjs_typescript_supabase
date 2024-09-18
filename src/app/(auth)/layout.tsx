

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

  <div className="min-h-screen flex items-center justify-center bg-slate-50 w-full">
      {children}
  </div>

  );
}
