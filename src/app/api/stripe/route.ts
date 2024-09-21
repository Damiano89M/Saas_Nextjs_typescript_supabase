// Importa le risorse necessarie, incluso Stripe e Supabase
import { stripe } from "@/utils/stripe/stripe";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";  // Supabase in modalità admin
import { NextResponse, type NextRequest } from "next/server";  // Next.js API e tipi
import sgMail from '@sendgrid/mail';


sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

// Funzione che gestisce le richieste POST dal webhook di Stripe
export async function POST(req: NextRequest) {
  let event;

  // Ottiene il corpo della richiesta
  const body = await req.text();  
  const requestHeaders = new Headers(req.headers);

  // Ottiene la firma di Stripe per verificare l'autenticità dell'evento
  const sig = requestHeaders.get("stripe-signature") as string | string[];
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY ?? ""  // Chiave per la verifica dei webhook
    );
  } catch (err: any) {
    // Se c'è un errore di firma o di verifica, ritorna un errore 400
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    console.log(event);  // Log dell'evento per il debug

    // Gestisce l'evento in base al suo tipo
    switch (event.type) {
      case "invoice.payment_succeeded":  // Evento di pagamento riuscito
        const paymentInvoiceSucceeded = event.data.object as any;
        const customerEmail = paymentInvoiceSucceeded.customer_email || "arduini.damiano@gmail.com";  // Ottiene l'email del cliente

        const supabase = createClient();
        // Inserisce o aggiorna la sottoscrizione nel database
        const { error } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email: customerEmail,
            stripeId: paymentInvoiceSucceeded.customer || "id",
            active: true,
          }, { onConflict: "email" })  // Risolve i conflitti sull'email

        if (error) {
          console.log(error.message);
          return NextResponse.json({ ok: false }, { status: 500 });
        }
       

        const sendMail = {
          to: customerEmail,
          from: 'arduini.damiano@gmail.com',
          subject: 'Conferma Abbonamento',
          text: `Grazie per esserti abbonato, ${customerEmail}! Il tuo pagamento è stato ricevuto con successo.`,
          html: `<strong>Grazie per esserti abbonato!</strong> <br /> Il tuo abbonamento è stato attivato con successo.`,
        }

        try {
          await sgMail.send(sendMail)
          console.log('Email inviata con successo');
        } catch(error) {
          console.error('Errore durante l\'invio della mail', error)
        }

        break;

      case "customer.subscription.deleted":  // Evento di cancellazione della sottoscrizione
        const customerSub = event.data.object as any;
        const customerSubEmail: string = customerSub.customer_email || "arduini.damiano@gmail.com";

        // Aggiorna lo stato della sottoscrizione come inattiva
        const { error: errorSub } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email: customerSubEmail,
            stripeId: customerSub.customer || "id",
            active: false,
          }, { onConflict: "email" });

        if (errorSub) {
          console.log(errorSub.message);
          return NextResponse.json({ ok: false }, { status: 500 });
        }
        break;

      default:
        // Logga l'evento non gestito
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Ritorna una risposta positiva
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.log(err);  // Log dell'errore
    return NextResponse.json({ ok: false }, { status: 500 });
  }
};

/*
        SPIEGAZIONE
Verifica del Webhook: Viene verificata la firma del webhook con stripe.webhooks.constructEvent per assicurarsi che provenga da Stripe.
Gestione degli eventi: A seconda del tipo di evento ricevuto, viene eseguita una logica specifica:
"invoice.payment_succeeded": Quando un pagamento dell'abbonamento ha successo, l'email del cliente viene salvata nel database Supabase, e l'abbonamento viene segnato come attivo.
"customer.subscription.deleted": Quando un abbonamento viene cancellato, lo stato nel database viene aggiornato come inattivo.
 */