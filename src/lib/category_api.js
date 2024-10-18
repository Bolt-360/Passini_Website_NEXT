const API_URL = 'https://blog-websites.bchat.lat/api/categories';
const TOKEN = "819a5f5abb1dc5088f2c8f1c1fb7950d783c88b1caed70ce2d2188de2eefb0b2b36657d89ce3f02e45f1c21f60c14eefd503fbeee90483ca8e8efd4cd5bfbef9f43c729b3515b7d8ab09c90efdb55dec0f5fe2b0b85c8a144a51c2741218510d515ad5319e6dda886fd0cf9f87660319840946a271314684b10013494a939f60";

export const fetchCategory = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar categoria.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    throw error;
  }
};

export const addCategory = async (nome) => {
  const slug = nome.trim().toLowerCase().replace(/\s+/g, '-');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data": {
          "name": nome,
          "slug": slug
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar categoria.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    throw error;
  }
};