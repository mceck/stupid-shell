export const contactApi = {
  contactMe: async (data: Record<string, any>) => {
    const result = await fetch(
      'https://mcdev-home.duckdns.org/mcdev-telegram-bot/contact-me',
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
