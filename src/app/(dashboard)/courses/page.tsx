// Importa i componenti e le risorse necessarie
import CoursesList from "@/app/components/layout/CoursesList";  // Componente per visualizzare la lista dei corsi
import { createClient } from "@/utils/supabase/server";  // Supabase client
import { handleSubscibe } from '../action';  // Funzione per gestire la sottoscrizione
import { Button } from "@/components/ui/button"

const LESSON_MAX_LIMIT = 1000;  // Limite massimo di lezioni

// Ottiene l'ID del prezzo dall'ambiente
const priceId = process.env.NEXT_PUBLIC_PRICE_ID;

const Page = async () => {
  const supabaseClient = createClient();  // Crea il client Supabase
  const user = await supabaseClient.auth.getUser();  // Ottiene l'utente attualmente autenticato
  const userEmail = user.data.user?.email;  // Estrae l'email dell'utente

  let hasActiveSub = false;  // Variabile per tracciare se l'utente ha una sottoscrizione attiva

  if (userEmail) {
    // Controlla se l'utente ha una sottoscrizione attiva
    const { error: errorSub } = await supabaseClient
      .from("subscriptions")
      .select()
      .eq("email", userEmail)
      .eq("active", true)
      .single();

    if (!errorSub) {
      hasActiveSub = true;
    }
  }

  // Imposta il numero massimo di lezioni accessibili in base alla sottoscrizione
  const maxAvailableLesso = hasActiveSub ? LESSON_MAX_LIMIT : 1;

  // Recupera le lezioni disponibili da Supabase
  const { data, error } = await supabaseClient
    .from('lessons')
    .select()
    .limit(maxAvailableLesso);

  if (error) {
    return <span>Errore nel recupero delle lezioni</span>;
  }

  if (!data || data.length === 0) {
    return <span>Nessuna lezione</span>;
  }

  return (
    <div className="container min-h-screen p-4">
      <h1 className="text-center text-6xl md:text-7xl font-bold mb-8">I tuoi corsi</h1>
      <div className="w-full px-24">
        {/* Componente per visualizzare la lista dei corsi */}
        <CoursesList lessons={data} />

        {/* Se l'utente non ha una sottoscrizione attiva, mostra il pulsante per abbonarsi */}
        {!hasActiveSub && (
          <form action={handleSubscibe}>
            <input
              hidden  // Campo nascosto con l'ID del prezzo
              value={priceId}
              name='price'
            />
            <Button
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type='submit'
            >
              Get access
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
