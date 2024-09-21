import { Button } from "@/components/ui/button";
import { stripe } from "@/utils/stripe/stripe";
import Link from "next/link";

const confirmPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    /*     
            //SE SI VOLESSERO RECUPERARE I DATI DELL'UTENTE DA QUI
    
            // Verifica che session_id sia una stringa e non un array
        const sessionId = Array.isArray(searchParams.session_id) 
            ? searchParams.session_id[0] // Prendi il primo elemento se è un array
            : searchParams.session_id || ""; // Usa la stringa o un fallback a ""
    
        // Recupera la sessione usando sessionId, che ora è garantito essere una stringa
        const session = await stripe.checkout.sessions.retrieve(sessionId); */
    const success = searchParams.success;
    if (success != "true") {

        return (
            <>
                <div className="p-24 text-center text-3xl">Qualcosa è andato storto, riprova</div>
            </>
        );
    }
    return (
        <>
            <div className="p-24 text-center text-3xl">Grazie avrai presto nostre notizie sulla tua mail</div>
            <div className="w-100 flex justify-center">
                <Button className="text-center" asChild><Link href='courses'>Vai ai corsi</Link></Button>
            </div>
        </>
    );
};

export default confirmPage;
