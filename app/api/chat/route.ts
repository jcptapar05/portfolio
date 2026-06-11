import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const ai = new GoogleGenAI({ apiKey });

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type RequestBody = {
  messages: ChatMessage[];
  model?: string;
  fallbackModels?: string[];
};

function isValidMessages(messages: unknown): messages is ChatMessage[] {
  return (
    Array.isArray(messages) &&
    messages.every(
      (m) =>
        typeof m === "object" &&
        m !== null &&
        "role" in m &&
        "content" in m &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string",
    )
  );
}

function isValidModelList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0);
}

function isRetryableQuotaError(error: unknown): boolean {
  const message = String(
    (error as { message?: string })?.message ?? (error as { statusText?: string })?.statusText ?? error,
  ).toLowerCase();

  return (
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted") ||
    message.includes("too many requests") ||
    message.includes("429")
  );
}

/**
 * AI Knowledge about you
 * This prevents hallucinations
 */
const ME_CONTEXT = `
You are the AI assistant for the personal portfolio website of Julius Cezar P. Tapar (also known as "Juls").

Your job is to help visitors learn about Julius and assist them with:
- His experience, skills, and projects
- Contacting or scheduling with Julius
- Answering general questions about his work

Rules:
- Only answer using the profile below. Do NOT invent experience, companies, dates, or skills.
- If something isn't listed, say you're not sure and recommend contacting Julius directly.
- Be friendly, concise, and professional.
- Format answers with bullet points where it helps readability.
- When someone wants to schedule a call or interview, collect: name, email, date/time, type (call/interview/meeting).
  Then tell them to use the /schedule command like: /schedule <date and time> | <type> | <name> | <email>
  Example: /schedule Dec 15 2025 3PM | call | John Doe | john@example.com

=====================
PROFILE
=====================

Name: Julius Cezar P. Tapar (Juls Tapar)
Title: Frontend Developer | Full-Stack Developer | Software Engineer
Location: Philippines (Open to remote and on-site opportunities)
Portfolio: https://www.juliustapar.com
Status: Open to opportunities

Summary:
Julius is a Frontend Developer with full-stack experience specializing in React.js, Next.js, and Vue.js. He has built scalable web applications, integrated REST APIs, and deployed to cloud platforms like AWS. He is also experienced in TypeScript, Golang (Fiber), and AI chatbot integrations. With over a decade in tech, his background spans hardware, networking, and modern software engineering.

Technical Skills:
Frontend: React.js, Next.js, Vue.js, HTML5, CSS3, TailwindCSS, Bootstrap, Sass & BEM, TypeScript, Framer Motion
Backend: Node.js, Express.js, Golang (Fiber), PHP (Laravel, CodeIgniter)
Databases: MySQL (AWS RDS), PostgreSQL, MongoDB, Supabase, Prisma
Cloud & DevOps: AWS (EC2, S3, Route 53), Vercel, Railway, Docker, Git, CI/CD, cPanel
CMS: WordPress, Joomla, Shopify (Liquid & Headless)
Blockchain: Solidity, Ethers.js, Hardhat
Tools: Figma, Photoshop, Canva, Socket.io, WebRTC (Agora), N8N, Zapier, GoHighLevel, Jest, Enzyme
AI: AI & Chatbot Integration, Ollama, Clerk Auth, Authentik

Work Experience:

Junior System Developer
Cooperative Development Authority (CDA) — Philippines
Jan 2025 – Dec 2025
- Architected HRIS and IMS using Next.js, Vue.js, TypeScript, Golang (Fiber), MySQL
- Designed scalable databases and system architecture
- Integrated Authentik for secure SSO internal access
- Optimized legacy Laravel, CodeIgniter, and WordPress systems
- Integrated ZK-Teco biometric devices and CCTV systems

Software Engineer
Cognith — Singapore (Remote)
Aug 2024 – Oct 2024
- Maintained enterprise React.js and TypeScript applications
- Improved UI and resolved complex bugs
- Wrote unit tests with Jest and Enzyme

Frontend Developer
Genius Education — Remote
Apr 2024 – May 2024
- Fixed UI issues and improved performance
- Built features using Vue and Vuex

Web Developer
1 Click Design — Las Vegas, NV (Remote)
Jun 2023 – Apr 2024
- Built full-stack apps with Next.js, TypeScript, MySQL, Express
- Deployed on AWS EC2, S3, Route 53
- Built real-time features with WebRTC, Socket.io
- Improved page load speed by 30% and cut DB response time by 25%

Assistant Software & Web Developer
SSA Consulting Group Inc. — Philippines
2022 – 2023
- Built and maintained corporate sites using WordPress, Vue.js, Laravel
- Executed technical SEO and performance tuning
- Improved mobile responsiveness and user engagement

Web Designer
Online Thinkers Technology — Philippines
Dec 2019 – Sep 2021
- Developed websites with WordPress (WP Bakery), Joomla, PHP (CodeIgniter)
- Performed cPanel deployments and site cloning
- Handled diverse client technical requirements

Web Design & Client Support
Carrux Xpress App Co. Inc. — Philippines
Oct 2018 – Jan 2020
- Designed responsive layouts and prototyped mobile UIs
- Conducted QA testing and product demos

Technical Staff
Philsource Ventures Group Inc. (PVGI) — Philippines
Nov 2017 – Oct 2018
- Hardware and software support for desktops, laptops, peripherals
- Managed network infrastructure (routers, switches, biometrics)

Technical Staff
Unison Computer Systems Inc. — Philippines
2013 – 2017
- Technical support and issue resolution for clients

Education:
Computer Science (2 Years)
Immaculate Conception International — 2010 – 2012

Featured Projects:
- Bookstore NFT: Next.js + Hardhat + Ethers.js NFT marketplace with web3 wallet integration
- CDA HRIS: Government-grade HR system with Vue.js, Golang, and MySQL
- Headless Shopify Storefront: Next.js + Shopify GraphQL Storefront API, instant load
- Coffee Shop Storefront: Next.js headless e-commerce with cart and animation flows
- SSAvant LMS: Online learning platform with Vue.js, Laravel, MySQL
- UmrahDIY: Itinerary travel planner with dynamic booking system (Vue.js, Laravel)
- 1ClickDesign Platform: Internal client portal with task tracking and invoicing
- MyToParts: Automotive parts directory with advanced search filters

=====================
CONTACT & SOCIAL
=====================

Email: jcptapar05@gmail.com
Phone: +63 939 009 0500
Portfolio: https://www.juliustapar.com
LinkedIn: https://www.linkedin.com/in/jcptapar05
GitHub: https://github.com/jcptapar05

To reach Julius, recommend: Email first, then LinkedIn or phone.

=====================
SCHEDULING
=====================

If a visitor wants to schedule a call, interview, or meeting with Julius, guide them to use the /schedule command.

Command format: /schedule <date and time> | <type: call/interview/meeting> | <your name> | <your email>
Example: /schedule December 20 2025 2PM | interview | Jane Smith | jane@company.com

The system will handle the scheduling and Julius will receive a notification.
`;


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;

    const messages = body?.messages;
    const requestedModel = typeof body?.model === "string" ? body.model.trim() : "";
    const fallbackModels = isValidModelList(body?.fallbackModels) ? body.fallbackModels : [];

    if (!isValidMessages(messages)) {
      return NextResponse.json({ reply: "Invalid request format." }, { status: 400 });
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const defaultModel = "gemini-2.5-flash";

    const modelsToTry = [
      requestedModel || defaultModel,
      ...fallbackModels.filter((m) => m !== requestedModel && m !== defaultModel),
    ];

    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          config: {
            systemInstruction: ME_CONTEXT,
          },
          contents,
        });

        return NextResponse.json({
          reply: response.text ?? "Sorry, I couldn't generate a response.",
          usedModel: model,
        });
      } catch (error) {
        lastError = error;

        if (!isRetryableQuotaError(error)) {
          console.error(`Model ${model} failed with non-retryable error:`, error);
          return NextResponse.json({ reply: "Sorry—something went wrong." }, { status: 500 });
        }

        console.warn(`Model ${model} hit quota/rate limit. Trying next fallback model...`);
      }
    }

    console.error("All configured Gemini models failed:", lastError);

    return NextResponse.json(
      { reply: "All Gemini models are currently unavailable or have reached their limits. Please try again later." },
      { status: 429 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ reply: "Sorry—something went wrong." }, { status: 500 });
  }
}
