"use server";

import { validateToken } from "@/lib/turnstile";
import { contactWebSchema } from "@/schema/contactWeb";
//import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { validateTurnstileToken } from "next-turnstile";

export async function Send(
  previousState: unknown | undefined,
  formData: FormData,
) {
  console.log("On a appelé Send");

  const submission = parseWithZod(formData, {
    schema: contactWebSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  //Vérification token
  const tokenValidated = await validateTurnstileToken({
    token: submission.value.turnstileToken,
    secretKey: process.env.TURNSTILE_WIGDET_SECRET ?? "MISSING",
  });

  if (!tokenValidated) {
    //TODO : standardiser résultat token invalide
    return submission.reply({
      fieldErrors: {
        turnstileToken: ["Captcha invalide"],
      },
    });
    return;
  }

  //Enregistrement BDD
  //Envoi mail notification

  //Tout est OK
  //return NextResponse.;

  return submission.reply({ resetForm: true });
}
