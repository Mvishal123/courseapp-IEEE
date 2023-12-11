import { handler } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/db";
import { Course, StripeCustomer, User } from "@/models";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

// connectDb();

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(handler);
    console.log("courseId1", params.courseId);

    if (!session || !session.user) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const course = await Course.findOne({ _id: params.courseId });
    console.log("course", course);

    if (!course) {
      return NextResponse.json(
        { message: "course not found" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    const alreadyPurchased = user?.mycourses.includes(params.courseId);
    console.log("user", user);

    if (alreadyPurchased) {
      return NextResponse.json(
        { message: "course already purchased" },
        { status: 200 }
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: course.title,
            description: course.description,
          },
          unit_amount: Math.round(course.price * 100),
        },
      },
    ];

    const stripeCustomer = await StripeCustomer.findOne({ userId: user._id });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      await new StripeCustomer({
        userId: user._id,
        stripeCustomerId: customer.id,
      }).save(); // Save the new instance to the database
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course._id}?canceled=1`,
      metadata: {
        courseId: course._id,
        userId: user._id,
      },
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error: any) {
    console.error("[COURSE CHECKOUT]", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
