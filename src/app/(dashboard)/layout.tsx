import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { createClient } from "../../utils/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabaseClient = createClient();

  const { data } = await supabaseClient.auth.getUser();


  return (

    <>

        <Navbar user={data.user} />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />

    </>

  );
}
