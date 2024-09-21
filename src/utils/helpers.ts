export const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Se disponibile, usa l'URL locale o di produzione.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Usato automaticamente in produzione su Vercel.
      "http://localhost:3000/"; // Fallback automatico per sviluppo locale.
  
    // Assicura che l'URL includa 'http' o 'https'.
    url = url.includes("http") ? url : `https://${url}`;
  
    // Assicura che l'URL termini con una barra finale '/'.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  
    return url;
  };
  