import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2024-06-20" });

export async function POST(request: Request) {
  const body = await request.json();
  const { lineItems, successUrl, cancelUrl } = body as {
    lineItems: { price_data: any; quantity: number }[];
    successUrl: string;
    cancelUrl: string;
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ id: session.id, url: session.url });
}


