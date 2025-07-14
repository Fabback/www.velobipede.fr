import { z } from "zod";

const regex_phone_fr = /^((\+33)|0)[-\s.]?[0-9]([-\s.]?[0-9]{2}){4}$/;

export const contactWebSchema = z.object({
  name: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Veuillez renseigner votre nom" })
      .min(5, "Veuillez renseigner votre nom"),
  ),
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Veuillez renseigner une adresse email" })
      .email({ message: "Adresse email invalide" }),
  ),
  phone: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "Veuillez renseigner un téléphone pour vous rappeler",
      })
      .regex(
        regex_phone_fr,
        "Format téléphone invalide (exemple : 02 42 32 26 33, +336324589, 05-36-35-36-98 ...)",
      ),
  ),
  topic: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Veuillez choisir un sujet" }),
  ),
  message: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Veuillez saisir un message" }),
  ),
});
export type ContactWebData = z.infer<typeof contactWebSchema>;
