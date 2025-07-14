"use client";

import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { Send } from "@/server/actions/ContactFormActions";

import SubmitButtonForm from "./SubmitFormButton";
import { Select, Textarea, TextInput, Title } from "@mantine/core";
import { useActionState, useRef, useState } from "react";

import { verifyTurnstileToken } from "@/lib/turnstile";
import { Turnstile } from "@/components/Turnstile";
import { contactWebSchema } from "@/schema/contactWeb";

export default function ContactForm() {
  //Turnstile
  const [turnstileWidgetId, setTurnstileWidgetId] = useState("");
  const [statusTurnstile, setStatusTurnstile] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessageTurnstile, setErrorMessageTurnstile] =
    useState<string>("");

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
      console.log("Appel onSubmit");

      //Erreur validation de saisie
      if (context?.submission?.status !== "success") {
        console.log("verif KO eject");
        event.preventDefault();
        return;
      }

      const token = context.formData.get("cf-turnstile-response") as string;
      const tokenVerified = await verifyTurnstileToken(token);

      //Erreur validation token
      if (!("success" in tokenVerified) || !tokenVerified.success) {
        setStatusTurnstile("error");
        console.log("token KO eject");
        event.preventDefault();
        return;
      } else {
        setStatusTurnstile("success");
      }

      console.log("OK onSubmit");
    },

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactWebSchema });
    },
    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      {...getFormProps(form)}
      action={sendServerAction}
      className="flex flex-col gap-2 p-3"
    >
      <Title order={3}>Contactez-moi</Title>
      <TextInput
        label="Mon nom*"
        key={fields.name.key}
        name={fields.name.name}
        error={fields.name.errors}
      />
      <TextInput
        label="Mon email*"
        key={fields.email.key}
        name={fields.email.name}
        error={fields.email.errors}
      />
      <TextInput
        label="Mon numéro de téléphone*"
        key={fields.phone.key}
        name={fields.phone.name}
        error={fields.phone.errors}
      />
      <Select
        label="L'objet de mon message*"
        key={fields.topic.key}
        name={fields.topic.name}
        error={fields.topic.errors}
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
        label="Mon message*"
        maxLength={1000}
        key={fields.message.key}
        name={fields.message.name}
        error={fields.message.errors}
      ></Textarea>

      <Turnstile
        success={statusTurnstile === "success"}
        theme={"auto"}
        onWidgetId={setTurnstileWidgetId}
      ></Turnstile>

      <SubmitButtonForm>Envoyer</SubmitButtonForm>
    </form>
  );
}
