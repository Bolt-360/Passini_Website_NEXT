import { createContext, useContext, useEffect, useState } from "react";
import { fetchClients, addClient } from "@/lib/client_api";
import { fetchCategory, addCategory } from "@/lib/category_api";
import { fetchAuthor, addAuthor } from "@/lib/author_api";
import { useToast } from "@/hooks/use-toast";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    clients: [],
    categories: [],
    authors: []
  });
  const { toast } = useToast();

  // Função genérica para buscar dados (cliente, categoria, autor)
  const fetchData = async (fetchFunc, key) => {
    try {
      const fetchedData = await fetchFunc();
      setData((prevState) => ({
        ...prevState,
        [key]: fetchedData,
      }));
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao buscar dados.",
        variant: "destructive",
      });
    }
  };

  // Função genérica para adicionar item (cliente, categoria, autor)
  const addNewItem = async (addFunc, fetchFunc, key, itemName) => {
    try {
      await addFunc(itemName);
      fetchData(fetchFunc, key); // Atualiza a lista após adicionar
    } catch (error) {
      toast({
        title: "Erro",
        description: `Erro ao adicionar ${itemName}.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData(fetchClients, 'clients');
    fetchData(fetchCategory, 'categories');
    fetchData(fetchAuthor, 'authors');
  }, []);

  return (
    <DataContext.Provider
      value={{
        clients: data.clients,
        categories: data.categories,
        authors: data.authors,
        addNewClient: (name) => addNewItem(addClient, fetchClients, 'clients', name),
        addNewCategory: (name) => addNewItem(addCategory, fetchCategory, 'categories', name),
        addNewAuthor: (name) => addNewItem(addAuthor, fetchAuthor, 'authors', name),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
