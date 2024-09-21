'use server';
import { getURL } from "@/utils/helpers";
import { stripe } from "@/utils/stripe/stripe";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function handleSubscibe(formData: FormData) {
    const priceId = formData.get('price') as string;

    const supabase = createClient()
    const {data: {session}} = await supabase.auth.getSession();

    if (!session || !session.user) {
        console.error('Nessun utente autenticato');
        return;
    }

    const userEmail = session.user.email;

    console.log(userEmail, 'Email dell\'utente autenticato');
    

    const sessionStripe = await stripe.checkout.sessions.create({
        customer_email: userEmail,  // Usa l'email dell'utente autenticato
        billing_address_collection: "required", //obbliga l'utente a fornire l'indirizzo di fatturazione.
        locale: "it",
        line_items: [  //contiene l'ID del prezzo dell'abbonamento e la quantità (1).
            {
                price: priceId,
                quantity: 1
            },
        ],
        allow_promotion_codes: true,
        mode: "subscription", //impostato su "subscription" perché si tratta di un abbonamento.
        success_url: `${getURL()}/confirm?success=true&session_{CHECKOUT_SESSION_ID}`,
        //specificano dove viene reindirizzato l'utente al termine del pagamento (successo o fallimento).
        cancel_url: `${getURL()}/confirm?success=false`,
    });
    if (!sessionStripe || !sessionStripe.url) {
        return;
    }

    redirect(sessionStripe.url);
}

/*
                        SPIEGAZIONE
Estrazione di priceId: La funzione estrae l'ID del prezzo (priceId) dal formData.
Creazione della sessione di checkout di Stripe: Viene creata una sessione di checkout con Stripe utilizzando l'API di Stripe (stripe.checkout.sessions.create). I parametri principali sono:
billing_address_collection: obbliga l'utente a fornire l'indirizzo di fatturazione.
line_items: contiene l'ID del prezzo dell'abbonamento e la quantità (1).
mode: impostato su "subscription" perché si tratta di un abbonamento.
success_url e cancel_url: specificano dove viene reindirizzato l'utente al termine del pagamento (successo o fallimento).
Reindirizzamento a Stripe: Se la sessione viene creata con successo, l'utente viene reindirizzato alla pagina di pagamento di Stripe attraverso session.url.
 */