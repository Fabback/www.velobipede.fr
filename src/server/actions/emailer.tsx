// import "server-only";

// import { z } from "zod";
// import {
//   SendMailOptions,
//   TransportOptions,
//   Transporter,
//   createTransport,
// } from "nodemailer";
// import SMTPTransport, { SentMessageInfo } from "nodemailer/lib/smtp-transport";
// import { ParseBool } from "@/lib/HelperConvert";
// import { unknown } from "zod";

// export const Email = z.object({
//   //from: z.string({ required_error: "Email expéditeur manquant",invalid_type_error: "Email expéditeur invalide" }).email("Email expéditeur invalide"),
//   to: z
//     .string({
//       required_error: "Email expéditeur manquant",
//       invalid_type_error: "Email expéditeur invalide",
//     })
//     .email("Email expéditeur invalide"),
//   subject: z
//     .string({
//       required_error: "Sujet email manquant",
//       invalid_type_error: "Sujet email manquant",
//     })
//     .trim(),
//   text: z.string().optional(),
//   /*html?: string, */
// });
// export type Email = z.infer<typeof Email>;

// type SendEmailProps = {
//   from?: string;
//   to: string;
//   subject: string;
//   text?: string;
//   html?: string;
//   SMTPOptions?: {
//     port: number;
//     host: string;
//     auth: {
//       user: string;
//       pass: string;
//     };
//     secure: boolean;
//   };
// };

// type SendEmailResult = {
//   message: string;
// } & (
//   | {
//       success: false;
//       errors: string[];
//     }
//   | {
//       success: true;
//     }
// );

// function ValidateEmailProps(Props: SendEmailProps): string[] {
//   const missing_parameters: string[] = [];

//   if (!Props.to) missing_parameters.push("Destinataire manquant");
//   if (!Props.text && !Props.html) missing_parameters.push("Contenu manquant");

//   return missing_parameters;
// }

// export async function SendEmail(
//   Props: SendEmailProps,
// ): Promise<SendEmailResult> {
//   const errors: string[] = [];

//   errors.push(...ValidateEmailProps(Props));

//   if (errors.length === 0) {
//     const transporterOptions: SMTPTransport.Options = Props.SMTPOptions ?? {
//       port: parseInt(
//         process.env.EMAILER_SERVICE_PORT ??
//           (String(process.env.EMAILER_SERVICE_PORT).length === 0
//             ? "25"
//             : String(process.env.EMAILER_SERVICE_PORT)),
//       ),
//       host: process.env.EMAILER_SERVICE_HOST,
//       auth: {
//         user: process.env.EMAILER_SERVICE_LOGIN,
//         pass: process.env.EMAILER_SERVICE_PASSWORD,
//       },
//       secure: ParseBool(process.env.EMAILER_SERVICE_SECURE, false),
//     };

//     let transporter: Transporter<SentMessageInfo> | undefined;

//     try {
//       transporter = createTransport(transporterOptions);

//       const mailData: SendMailOptions = {
//         from: Props?.from ?? transporterOptions.auth?.user,
//         to: Props.to,
//         subject: Props.subject,
//         text: Props.text,
//         html: Props.html,
//       };

//       await transporter
//         .sendMail(mailData)
//         .then((sentMessageInfo) => {
//           if (sentMessageInfo.rejected?.length > 0) {
//             errors.push(`REJECTED ${sentMessageInfo.rejected.length}`);
//             sentMessageInfo.rejected.map((mel) => {
//               errors.push(`Email rejecté pour : "${JSON.stringify(mel)}"`);
//             });
//           }

//           if (sentMessageInfo.pending?.length > 0) {
//             errors.push(`PENDING ${sentMessageInfo.pending.length}`);
//             sentMessageInfo.rejected.map((mel) => {
//               errors.push(`Email en attente pour : "${JSON.stringify(mel)}"`);
//             });
//           }
//         })
//         .catch((reason) => {
//           errors.push("Erreur inattendue à l'envoi du mail");
//         });
//     } catch (e) {
//       console.error(e);
//       errors.push("Erreur inattendue à l'envoi du mail");
//     } finally {
//       transporter?.close();
//     }
//   }

//   if (errors.length === 0) {
//     return {
//       success: true,
//       message: "Email envoyé avec succès",
//     };
//   } else {
//     return {
//       success: false,
//       message: "Erreur envoi email",
//       errors: errors,
//     };
//   }
// }
