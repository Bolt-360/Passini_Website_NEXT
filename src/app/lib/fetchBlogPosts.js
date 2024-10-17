"use server"

import config from "@/app/config";
let url = 'https://blog-websites.bchat.lat/api/articles?populate=*';

if(config.deploy_dev == 1){
    url = 'https://blog-websites.bchat.lat/api/articles?populate=*&status=draft';
}



async function fetchBlogPosts() {
    console.log(url);


    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${config.stripe_api_key}`,
        },
        next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
        throw new Error(`Erro ao buscar posts do blog: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data; // Retornando o objeto completo, não apenas data.data
}

export default fetchBlogPosts;
