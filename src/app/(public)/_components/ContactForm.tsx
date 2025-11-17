"use client";

import { getFormProps, useForm, useField } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";

import { Send } from "@/server/actions/ContactFormActions";

import SubmitButtonForm from "./SubmitFormButton";

import { Select, Textarea, TextInput, Title } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

import { useActionState } from "react";

import { Turnstile } from "next-turnstile";

import { contactWebSchema } from "@/schema/contactWeb";

export default function ContactForm() {
  //Turnstile
  const [turnstileToken, setTurnstileToken] = useInputState<string | undefined>(
    undefined,
  );

  //React19 : useFormState => useActionState
  const [lastResult, sendServerAction, pending] = useActionState(
    Send,
    undefined,
  );

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    /**
     * Ordre de traitement submit
     *  - Vérification validation contenu saisie : context
     *  - Vérification validité turnstile
     */
    async onSubmit(event, context) {
      //Erreur de validation, on ne devrait pas être là...
      if (!turnstileToken) {
        event.preventDefault();
        return;
      }
    },

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactWebSchema });
    },
    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleTurnstileVerified(token: string): void {
    setTurnstileToken(token);
  }

  function handleTurnstileError(error: unknown): void {
    //throw new Error("Function not implemented.");
    //TODO : Ajout pop message alerte

    setTurnstileToken(undefined);
  }

  return (
    <form
      {...getFormProps(form)}
      action={sendServerAction}
      className="flex flex-col gap-2 p-3"
    >
      <Title order={3}>Contactez-moi</Title>
      <TextInput
        label="Mon nom"
        key={fields.name.key}
        name={fields.name.name}
        error={fields.name.errors}
        required={fields.name.required}
      />
      <TextInput
        label="Mon email"
        key={fields.email.key}
        name={fields.email.name}
        error={fields.email.errors}
        required={fields.email.required}
      />
      <TextInput
        label="Mon numéro de téléphone"
        key={fields.phone.key}
        name={fields.phone.name}
        error={fields.phone.errors}
        required={fields.phone.required}
      />
      <Select
        label="L'objet de mon message"
        key={fields.topic.key}
        name={fields.topic.name}
        error={fields.topic.errors}
        required={fields.topic.required}
        data={[
          {
            label: "Je souhaite une intervention/un renseignement",
            value: "INTERVENTION",
          },
          { label: "Je souhaite entreprendre à vélo", value: "BAV" },
          {
            label: "J'ai des besoins pour mon entreprise",
            value: "ENTREPRISE",
          },
        ]}
      />
      <Textarea
        label="Mon message"
        maxLength={1000}
        key={fields.message.key}
        name={fields.message.name}
        error={fields.message.errors}
        required={fields.message.required}
      ></Textarea>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_WIGDET_KEY ?? "MISSING"}
        onVerify={handleTurnstileVerified}
        execution="render"
        refreshTimeout="auto"
        theme="auto"
        appearance="always"
        onError={handleTurnstileError}
      />

      <TextInput
        styles={{
          wrapper: {
            display: "none",
          },
        }}
        value={turnstileToken ?? ""}
        onChange={(e) => {}} //onChange à déclarer pour conserver
        key={fields.turnstileToken.key}
        name={fields.turnstileToken.name}
        error={fields.turnstileToken.errors}
      />

      <SubmitButtonForm disabled={!turnstileToken}>Envoyer</SubmitButtonForm>
    </form>
  );
}
