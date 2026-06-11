import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

function convertToISO8601(input: string): string {
  let clean = input.trim();

  // If already in YYYY-MM-DDTHH:mm:ss format, return it
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (isoRegex.test(clean)) {
    return clean.slice(0, 19);
  }

  // Normalize time format to ensure it has minutes and space before AM/PM
  // E.g., "3PM" -> "3:00 PM", "3pm" -> "3:00 PM", "3:30pm" -> "3:30 PM"
  clean = clean.replace(/(\d+)(?::(\d+))?\s*([ap]m)/i, (match, p1, p2, p3) => {
    const mins = p2 || "00";
    const ampm = p3.toUpperCase();
    return `${p1}:${mins} ${ampm}`;
  });

  // Ensure there is a 4-digit year in the string.
  // If we don't find a 4-digit number starting with '20' (e.g. 2025, 2026), append the current year.
  if (!/\b20\d{2}\b/.test(clean)) {
    const currentYear = new Date().getFullYear();
    const timeIndex = clean.search(/\b\d+(?::\d+)?\s*[AP]M\b/i);
    if (timeIndex !== -1) {
      clean = clean.slice(0, timeIndex).trim() + ` ${currentYear} ` + clean.slice(timeIndex).trim();
    } else {
      clean = clean + ` ${currentYear}`;
    }
  }

  const date = new Date(clean);
  if (isNaN(date.getTime())) {
    // If invalid, return original clean string to let Zod regex fail validation
    return input.trim();
  }

  const pad = (num: number) => String(num).padStart(2, "0");
  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}`;
}

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Valid email required."),
  datetime: z.string()
    .min(1, "Date and time is required.")
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, "Invalid date/time format. Please use a format like: Dec 15 2025 3PM"),
  type: z.enum(["call", "interview", "meeting"]).default("call"),
  notes: z.string().optional(),
});

// Set your n8n webhook URL in .env as N8N_SCHEDULE_WEBHOOK
const N8N_WEBHOOK = process.env.N8N_SCHEDULE_WEBHOOK ?? "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body && typeof body.datetime === "string") {
      body.datetime = convertToISO8601(body.datetime);
    }

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

        const contentType = n8nRes.headers.get("content-type") ?? "";
        const n8nData = contentType.includes("application/json")
          ? await n8nRes.json().catch(() => null)
          : await n8nRes.text().catch(() => null);

        // ✅ Propagate n8n's actual status code
        if (!n8nRes.ok) {
          const errorMessage = typeof n8nData === "object" && n8nData?.message
            ? n8nData.message
            : typeof n8nData === "string" && n8nData
              ? n8nData
              : `Scheduling failed with status ${n8nRes.status}`;

          return NextResponse.json(
            { success: false, error: errorMessage },
            { status: n8nRes.status }
          );
        }

        const message = typeof n8nData === "object" && n8nData?.message
          ? n8nData.message
          : `Your ${type} has been scheduled for ${datetime}. Julius will reach out to confirm at ${email}.`;

        return NextResponse.json({
          success: true,
          message,
          scheduled: { name, email, datetime, type, notes },
        });

      } catch (n8nError: any) {
        // Only for actual network/fetch failures (n8n unreachable, timeout, etc.)
        console.error("n8n webhook error:", n8nError);
        return NextResponse.json(
          { success: false, error: "Could not reach scheduling service. Please try again." },
          { status: 502 }
        );
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
