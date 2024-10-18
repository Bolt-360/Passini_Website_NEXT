import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const TextareaField = ({ control, name, label, placeholder }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl className="rounded">
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="placeholder:text-gray-500"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default TextareaField;
