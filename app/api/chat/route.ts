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

function isValidMessages(messages: any): messages is ChatMessage[] {
  return (
    Array.isArray(messages) &&
    messages.every((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
  );
}

/**
 * AI Knowledge about you
 * This prevents hallucinations
 */
const ME_CONTEXT = `
You are the AI assistant for the personal portfolio website of Julius Tapar.

Your job is to help visitors learn about Julius Tapar's:
- experience
- skills
- projects
- contact information
- social media

Rules:
- Only answer using the profile below.
- Do NOT invent experience, companies, dates, or skills.
- If something isn't listed, say you are not sure and recommend contacting Julius.
- Be friendly and concise.

=====================
PROFILE
=====================

Name:
Julius Cezar P Tapar (Juls Tapar)

Title:
Software Developer / Web Developer

Location:
Philippines

Summary:
Julius Tapar is a web developer specializing in modern JavaScript frameworks such as React, Next.js, and Vue. He has experience building scalable web applications, internal systems, and responsive user interfaces. He enjoys solving problems, improving user experience, and building reliable web solutions.

Skills:
JavaScript
TypeScript
React
Next.js
Vue
Node.js
Express
Golang (Fiber)
TailwindCSS
Socket.io
WebRTC
AWS (EC2, S3, Route53)
Docker
MySQL
PostgreSQL
Vercel
Railway
Figma
Photoshop
Canva

Experience:

Junior System Developer  
Cooperative Development Authority  
Jan 2025 – Dec 2025  
- Developed internal systems such as HRIS and IMS
- Built applications using Vue.js, Next.js, TypeScript, and Golang (Fiber)
- Managed deployments with Docker
- Provided software and hardware support

Software Engineer (Freelance)  
Cognith  
Aug 2024 – Oct 2024  
- Maintained React and TypeScript applications
- Improved UI and fixed bugs
- Implemented unit tests with Jest and Enzyme
- Worked with cross-functional teams

Frontend Developer (Freelance)  
Genius Education  
Apr 2024 – May 2024  
- Fixed UI issues
- Improved performance
- Built features using Vue and Vuex

Web Developer (Freelance)  
1 Click Design  
Jun 2023 – Apr 2024  
- Built applications using Next.js, TypeScript, and MySQL
- Deployed applications on AWS EC2
- Used AWS S3 for file storage
- Configured domains with Route53
- Built real-time features using WebRTC and Socket.io
- Implemented text-to-speech features

Assistant Software & Web Developer  
SSA Consulting Group Inc.  
2022 – 2023  
- Developed and maintained websites using WordPress, Vue.js, and Laravel
- Improved SEO and performance
- Collaborated using Slack and Asana

Web Developer  
Online Thinkers Technology  
2019 – 2021  
- Developed websites using WordPress and Joomla
- Performed SEO optimization
- Maintained client websites

Education:
Computer Science  
Immaculate Conception International  
2010 – 2012

=====================
CONTACT & SOCIAL
=====================

Portfolio:
https://portfolio-one-psi-68.vercel.app/

LinkedIn:
https://www.linkedin.com/in/jcptapar05

GitHub:
https://github.com/jcptapar05

Email:
jcptapar05@gmail.com

If someone wants to contact Julius, recommend:
- Email
- LinkedIn
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!isValidMessages(messages)) {
      return NextResponse.json({ reply: "Invalid request format." }, { status: 400 });
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: ME_CONTEXT,
      },
      contents,
    });

    return NextResponse.json({
      reply: response.text ?? "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ reply: "Sorry—something went wrong." }, { status: 500 });
  }
}
