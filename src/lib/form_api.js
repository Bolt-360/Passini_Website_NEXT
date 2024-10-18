export const sendForm = async (data) => {
    try {
      const response = await fetch('https://n8n2.bchat.lat/webhook-test/formseo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Incluir Q/A": data.answers,
          "Resumo do Assunto": data.assunto,
          "Cliente": data.client,
          "Image Desc": data.image,
          "Palavras-Chaves": data.keywords,
          "Categoria": data.category,
          "Autor": data.author,
          "Tamanho": data.contentsize

        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar form');
      }
  
      const responseData = await response.json(); 
      return responseData;
    } catch (error) {
      console.error('Erro ao enviar form:', error);
      throw error;
    }
  };