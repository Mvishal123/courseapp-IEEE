import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import stripe from "@/lib/stripe";
import { connectDb } from "@/lib/db";
import { User } from "@/models";

connectDb();

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return NextResponse.json("Webhook Error: Missing metadata", {
        status: 400,
      });
    }
    const user = await User.findOne({ _id: userId });
    user.mycourses.push(courseId);
  } else {
    return NextResponse.json(
      `Webhook Error: Invalid event type ${event.type}`,
      {
        status: 200,
      }
    );
  }

  return new NextResponse(null, { status: 200 });
}
