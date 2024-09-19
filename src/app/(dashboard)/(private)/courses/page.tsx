import CoursesList from "@/app/components/layout/CoursesList";
import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabaseClient = createClient();

 
  const { data, error } = await supabaseClient
  .from('lessons')
  .select();

  if (error) {
    return <span>Errore nel recupero delle lezioni</span>;
  }

  if (!data ||data.length === 0) {
    return <span>Nessuna lezione</span>;
  }

  return (
    <div className="container min-h-screen p-4">
      <h1 className="text-center text-6xl md:text-7xl font-bold mb-8">I tuoi corsi</h1>
      <div className="w-full px-24">
        <CoursesList lessons={data} />
      </div>
    </div>
  );
};

export default Page;
