import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Valid email required."),
  datetime: z.string().min(1, "Date and time is required."),
  type: z.enum(["call", "interview", "meeting"]).default("call"),
  notes: z.string().optional(),
});

// Set your n8n webhook URL in .env as N8N_SCHEDULE_WEBHOOK
const N8N_WEBHOOK = process.env.N8N_SCHEDULE_WEBHOOK ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, email, datetime, type, notes } = parsed.data;

    // If n8n webhook is configured, forward to it
    if (N8N_WEBHOOK) {
      try {
        const n8nRes = await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, datetime, type, notes }),
        });

        const n8nData = await n8nRes.json().catch(() => null);

        return NextResponse.json({
          success: true,
          message: n8nData?.message ?? `Your ${type} has been scheduled for ${datetime}. Julius will confirm shortly!`,
          scheduled: { name, email, datetime, type, notes },
        });
      } catch (n8nError) {
        console.error("n8n webhook error:", n8nError);
        // Fall through to default success if n8n fails
      }
    }

    // Default success response (no n8n configured yet)
    return NextResponse.json({
      success: true,
      message: `Request received! Your ${type} for ${datetime} has been noted. Julius will reach out to confirm at ${email}.`,
      scheduled: { name, email, datetime, type, notes },
    });
  } catch (error: any) {
    console.error("Schedule API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
