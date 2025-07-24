import { Resend } from "resend";
import { generateConfirmationHtml } from "@/lib/email/generateConfirmationHtml";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface EmailProps {
  to: string;
  name: string;
  orderId: string;
}

export async function sendConfirmationEmail({ to, name, orderId }: EmailProps) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Order Confirmation - ${orderId}`,
    html: generateConfirmationHtml({ to, name, orderId }),
  });
}
