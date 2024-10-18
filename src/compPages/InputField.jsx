import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const InputField = ({ control, name, label, placeholder }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl className="rounded">
                    <Input
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

export default InputField;
