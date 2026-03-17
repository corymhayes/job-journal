import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm } from "@/hooks/form-context";
import { Button } from "@/components/ui/button";
import { FormFieldSelect } from "./form-field-select";
import { FormFieldInput } from "./form-field-input";
import { FormFieldDatePicker } from "./form-field-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { STATUS_OPTIONS, WORK_STYLE_OPTIONS } from "@/types/Options";
import {
  type Application,
  type ApplicationFormValues,
  type ApplicationPayload,
  applicationFormSchema,
} from "@/applicationSchema";

interface ApplicationFormProps {
  application?: Application;
  onClearSelection?: () => void;
}

export function ApplicationForm({
  application,
  onClearSelection,
}: ApplicationFormProps) {
  const isEditing = !!application?.id;
  const queryClient = useQueryClient();

  const insertMutation = useMutation<Response, Error, ApplicationPayload>({
    mutationFn: async (newApp) => {
      return await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApp),
      });
    },
  });

  const updateMutation = useMutation<Response, Error, ApplicationPayload>({
    mutationFn: async (newApp) => {
      console.log(newApp);
      return await fetch(`/api/${newApp.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApp),
      });
    },
  });

  const defaultValues: ApplicationFormValues = application
    ? {
        id: application.id,
        company: application.company,
        job: application.job,
        work_style: application.work_style ?? "Remote",
        status: application.status ?? "Applied",
        application_url: application.application_url ?? "",
        date_applied: application.date_applied
          ? new Date(application.date_applied)
          : new Date(),
        date_response: application.date_response
          ? new Date(application.date_response)
          : undefined,
      }
    : {
        company: "",
        job: "",
        work_style: "Remote" as const,
        status: "Applied" as const,
        application_url: "",
        date_applied: new Date(),
        date_response: undefined,
      };

  const form = useAppForm({
    defaultValues,
    validators: { onSubmit: applicationFormSchema },
    onSubmit: async ({ value, formApi }) => {
      const payload = {
        id: value.id,
        company: value.company,
        job: value.job,
        status: value.status,
        work_style: value.work_style,
        application_url: value.application_url || undefined,
        date_applied: value.date_applied.toISOString().split("T")[0],
        date_response: value.date_response
          ? value.date_response.toISOString().split("T")[0]
          : null,
      };

      try {
        if (isEditing) {
          await toast
            .promise(updateMutation.mutateAsync(payload), {
              loading: "Updating application...",
              success: "Application updated",
              error: "Unable to update",
            })
            .unwrap();
        } else {
          await toast
            .promise(insertMutation.mutateAsync(payload), {
              loading: "Saving application...",
              success: "Application added",
              error: "Unable to save",
            })
            .unwrap();
        }

        await queryClient.refetchQueries();
        formApi.reset();
        onClearSelection?.();
      } catch {
        toast.error("Unable to save application");
      }
    },
  });

  return (
    <form
      id="application-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldLegend className="mb-8">
          {isEditing ? "Edit Application" : "New Application"}
        </FieldLegend>
        <FieldGroup>
          <form.AppField name="status">
            {() => (
              <FormFieldSelect label="Status" items={[...STATUS_OPTIONS]} />
            )}
          </form.AppField>

          <form.AppField name="company">
            {() => <FormFieldInput label="Company" />}
          </form.AppField>

          <form.AppField name="job">
            {() => <FormFieldInput label="Job" />}
          </form.AppField>

          <form.AppField name="work_style">
            {() => (
              <FormFieldSelect
                label="Work Style"
                items={[...WORK_STYLE_OPTIONS]}
              />
            )}
          </form.AppField>

          <form.AppField name="application_url">
            {() => <FormFieldInput label="Job Posting" />}
          </form.AppField>

          <form.AppField name="date_applied">
            {() => <FormFieldDatePicker label="Date Applied" />}
          </form.AppField>

          <form.AppField name="date_response">
            {() => <FormFieldDatePicker label="Date Response" />}
          </form.AppField>
        </FieldGroup>
        <Field orientation="horizontal" className="mt-6">
          <Button type="submit" form="application-form">
            {isEditing ? "Update" : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              onClearSelection?.();
            }}
          >
            {isEditing ? "Cancel" : "Clear"}
          </Button>
        </Field>
      </FieldSet>
    </form>
  );
}
