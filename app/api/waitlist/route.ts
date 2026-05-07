import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  isWaitlistMailConfigured,
  loadWaitlistConfig
} from "@/lib/waitlist-config";

export const runtime = "nodejs";

type WaitlistPayload = {
  company?: string;
  email?: string;
  fullName?: string;
  useCase?: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeValue(value?: string) {
  return value?.trim() ?? "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;
    const fullName = normalizeValue(body.fullName);
    const email = normalizeValue(body.email).toLowerCase();
    const company = normalizeValue(body.company);
    const useCase = normalizeValue(body.useCase);
    const website = normalizeValue(body.website);

    if (website) {
      return NextResponse.json({
        message: "Thanks. Your request has been received."
      });
    }

    if (!fullName || !email || !company) {
      return NextResponse.json(
        {
          message: "Please include your name, work email, and company."
        },
        {
          status: 400
        }
      );
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address."
        },
        {
          status: 400
        }
      );
    }

    const config = await loadWaitlistConfig();

    if (!isWaitlistMailConfigured(config)) {
      return NextResponse.json(
        {
          message:
            "Waitlist mail delivery is not configured yet. Update config/waitlist.config.json with your SMTP settings."
        },
        {
          status: 503
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth:
        config.smtp.user && config.smtp.pass
          ? {
              user: config.smtp.user,
              pass: config.smtp.pass
            }
          : undefined
    });

    await transporter.sendMail({
      from: `${config.smtp.fromName} <${config.smtp.fromEmail}>`,
      to: config.recipientEmail,
      replyTo: email,
      subject: `${config.subjectPrefix} ${company}`,
      text: [
        "New Anomx waitlist request",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Use case: ${useCase || "Not provided"}`,
        `Submitted at: ${new Date().toISOString()}`
      ].join("\n"),
      html: `
        <h1>New Anomx waitlist request</h1>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Use case:</strong> ${escapeHtml(useCase || "Not provided")}</p>
        <p><strong>Submitted at:</strong> ${escapeHtml(new Date().toISOString())}</p>
      `
    });

    return NextResponse.json({
      message: "Thanks. Your request has been sent to the Anomx waitlist inbox."
    });
  } catch (error) {
    console.error("Failed to submit Anomx waitlist request", error);

    return NextResponse.json(
      {
        message: "Something went wrong while sending your request. Please try again."
      },
      {
        status: 500
      }
    );
  }
}
