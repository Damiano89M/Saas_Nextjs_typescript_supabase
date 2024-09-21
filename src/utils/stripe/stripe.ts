
// Importa la libreria Stripe e crea un'istanza con la chiave segreta e le impostazioni
import Stripe from "stripe";

export const stripe = new Stripe(
   process.env.STRIPE_SECRET_KEY ?? "",  // Ottiene la chiave segreta di Stripe dall'ambiente
  {
    // https://github.com/stripe/stripe-node#configuration
    // Imposta l'API di Stripe alla versione specificata
    apiVersion: "2024-06-20",
    // Informazioni sull'applicazione per Stripe (nome e versione dell'app)
      // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: "Next.js Subscription Starter",  // Nome dell'applicazione
      version: "0.1.0",  // Versione dell'applicazione
    },
  }
);
