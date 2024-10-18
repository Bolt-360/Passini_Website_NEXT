import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useDataContext } from "@/compPages/DataContext";
import { sendForm } from "@/lib/form_api";
import { Form } from "@/components/ui/form";
import TextareaField from "@/compPages/TextareaField";
import InputField from "@/compPages/InputField";
import SelectField from "@/compPages/SelectField";
import CheckboxField from "@/compPages/CheckboxField";
import PopoverSelectField from "@/compPages/PopoverSelectField";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  assunto: z.string().nonempty("O resumo do assunto é obrigatório"),
  keywords: z.string().nonempty("As palavras-chave são obrigatórias"),
  contentsize: z.string(),
  image: z.string().nonempty("O tema da imagem é obrigatório"),
  answers: z.boolean(),
  client: z.string().nonempty("O campo cliente é obrigatório"),
  category: z.string().nonempty("O campo categoria é obrigatório"),
  author: z.string().nonempty("O campo autor é obrigatório"),
});

export default function BlogPostForm() {
  const { clients, addNewClient, addNewCategory, categories, authors, addNewAuthor } = useDataContext();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState({
    client: "",
    category: "",
    author: ""
  });
  const [open, setOpen] = useState({
    client: false,
    category: false,
    author: false
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assunto: "",
      keywords: "",
      contentsize: "médio - 6 a 8 seções (1350 a 2000 palavras)",
      image: "",
      answers: false,
      client: "",
      category: "",
      author: ""
    },
  });
  const { reset } = form;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await sendForm({
        ...data,
        answers: data.answers ? "Sim" : "Não",
      });
      toast({
        title: "Enviado com sucesso!",
        variant: "default",
      });
      reset();
      setSearchTerm({ client: "", category: "", author: "" });
    } catch {
      toast({
        title: "Erro ao enviar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = (itemType, searchTerm, addFunc) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Erro",
        description: `Nome do ${itemType} é obrigatório`,
        variant: "destructive",
      });
      return;
    }
    addFunc(searchTerm);
  };

  const handleAddClient = () => handleAddItem("cliente", searchTerm.client, addNewClient);
  const handleAddCategory = () => handleAddItem("categoria", searchTerm.category, addNewCategory);
  const handleAddAuthor = () => handleAddItem("autor", searchTerm.author, addNewAuthor);

  const filterData = (data, searchTerm, key) => {
    if (!searchTerm) return data; // Retorna todos os dados se searchTerm estiver vazio
    return data.filter(item =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredClients = filterData(clients, searchTerm.client, 'Nome');
  const filteredCategory = filterData(categories, searchTerm.category, 'name')
  const filteredAuthor = filterData(authors, searchTerm.author, 'name')

  const contentSizeOptions = [
    { value: "pequeno – 3 a 5 seções (800 a 1300 palavras)", label: "Pequeno – 3 a 5 Seções (800 a 1300 palavras)" },
    { value: "médio - 6 a 8 seções (1350 a 2000 palavras)", label: "Médio - 6 a 8 Seções (1350 a 2000 palavras)" },
    { value: "grande – 9 a 12 seções (2000 a 3000 palavras)", label: "Grande – 9 a 12 Seções (2000 a 3000 palavras)" },
    { value: "muito grande – 13+ seções (3000+ palavras)", label: "Muito Grande – 13+ Seções (3000+ palavras)" }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Criar post no Blog
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextareaField
              control={form.control}
              name="assunto"
              label="Resumo do Assunto"
              placeholder="Texto resumindo o assunto tratado..."
            />

            <InputField
              control={form.control}
              name="keywords"
              label="Palavras-Chaves"
              placeholder="Escreva palavras-chaves relacionadas ao assunto..."
            />

            <SelectField
              control={form.control}
              name="contentsize"
              label="Extensão dos Artigos no Post"
              options={contentSizeOptions}
              placeholder="Selecione o tamanho do conteúdo"
            />


            <InputField
              control={form.control}
              name="image"
              label="Tema Criativo para Imagem"
              placeholder="Descreva como deve ser a imagem para o post"
            />

            <CheckboxField
              control={form.control}
              name="answers"
              label="Incluir seção de perguntas e respostas?"
            />

            <PopoverSelectField
              control={form.control}
              name="client"
              label="Cliente"
              items={filteredClients}
              placeholder="Selecione o cliente..."
              searchTerm={searchTerm.client}
              setSearchTerm={(value) => setSearchTerm(prevState => ({
                ...prevState,
                client: value
              }))}
              handleAddItem={handleAddClient}
              open={open.client}
              setOpen={(value) => setOpen((prevState) => ({ ...prevState, client: value }))}
            />

            <PopoverSelectField
              control={form.control}
              name="category"
              label="Categoria"
              items={filteredCategory}
              placeholder="Selecione a categoria..."
              searchTerm={searchTerm.category}
              setSearchTerm={(value) => setSearchTerm(prevState => ({
                ...prevState,
                category: value
              }))}
              handleAddItem={handleAddCategory}
              open={open.category}
              setOpen={(value) => setOpen((prevState) => ({ ...prevState, category: value }))}
            />

            <PopoverSelectField
              control={form.control}
              name="author"
              label="Autor"
              items={filteredAuthor}
              placeholder="Selecione o autor..."
              searchTerm={searchTerm.author}
              setSearchTerm={(value) => setSearchTerm(prevState => ({
                ...prevState,
                author: value
              }))}
              handleAddItem={handleAddAuthor}
              open={open.author}
              setOpen={(value) => setOpen((prevState) => ({ ...prevState, author: value }))}
            />

            <Button
              type="submit"
              className="w-full text-white bg-black rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}