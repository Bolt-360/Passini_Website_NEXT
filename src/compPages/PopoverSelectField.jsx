import React from 'react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem, CommandGroup } from "@/components/ui/command";
import { ChevronsUpDown, Plus } from "lucide-react"

const PopoverSelectField = ({
    control,
    name,
    label,
    items,
    placeholder,
    searchTerm,
    setSearchTerm,
    handleAddItem,
    open,
    setOpen,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex items-center space-x-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {field.value || placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command className="w-full">
                                    <CommandInput
                                        placeholder={`Buscar ${label.toLowerCase()}...`}
                                        value={searchTerm}
                                        onValueChange={(value) => setSearchTerm(value)}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {searchTerm && (
                                                <Button
                                                    onClick={handleAddItem}
                                                    className="w-full justify-start bg-transparent text-black hover:bg-gray-100"
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Adicionar "{searchTerm}"
                                                </Button>
                                            )}
                                            {!searchTerm && `Nenhum ${label.toLowerCase()} encontrado`}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {items.map((item) => (
                                                <CommandItem
                                                    key={item.id}
                                                    onSelect={() => {
                                                        field.onChange(item.Nome || item.name);
                                                        setSearchTerm(item.Nome || item.name);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {item.Nome || item.name} 
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PopoverSelectField;
