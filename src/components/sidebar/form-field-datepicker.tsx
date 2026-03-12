import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFieldContext } from "@/hooks/form-context";

export function FormFieldDatePicker({ label }: { label: string }) {
  const field = useFieldContext<Date | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            id={field.name}
            className="justify-start font-normal w-60 gap-2"
          >
            <CalendarIcon />
            {field.state.value ? format(field.state.value, "PPP") : <></>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-left" align="end">
          <Calendar
            className="w-full"
            mode="single"
            selected={field.state.value ?? undefined}
            onSelect={(date) => {
              if (date) field.handleChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
