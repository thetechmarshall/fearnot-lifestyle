import { PaystackButton } from "react-paystack";

if (!process.env.PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not defined");
}

const paystack = new PaystackButton(process.env.PAYSTACK_SECRET_KEY as string, {
    ap
})
