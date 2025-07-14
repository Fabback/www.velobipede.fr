"use server";

import { contactWebSchema } from "@/schema/contactWeb";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function Send(previousState: unknown, formData: FormData) {
  console.log("On a appelé Send");

  const submission = parseWithZod(formData, {
    schema: contactWebSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  //Vérification toke
  //Enregistrement BDD
  //Envoi mail notification

  //Tout est OK
  //return NextResponse.;
}
