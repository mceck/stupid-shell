export const contactApi = {
  contactMe: async (data: Record<string, any>) => {
    const result = await fetch(
      'https://mcdev-n8n.duckdns.org/webhook/contact-me',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (result.status !== 200) throw new Error('errore invio messaggio');
    return result.text();
  },
};
