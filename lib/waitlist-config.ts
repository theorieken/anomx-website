import { readFile } from "node:fs/promises";
import path from "node:path";

export type WaitlistConfig = {
    recipientEmail: string;
    smtp: { fromEmail: string; fromName: string; host: string; pass: string; port: number; secure: boolean; user: string };
    subjectPrefix: string;
};

export async function loadWaitlistConfig(): Promise<WaitlistConfig> {
    let file: Partial<WaitlistConfig> = {};
    try { file = JSON.parse(await readFile(path.join(process.cwd(), "config", "waitlist.config.json"), "utf-8")); }
    catch (error) { if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error; }
    const env = process.env;
    return {
        recipientEmail: env.WAITLIST_RECIPIENT_EMAIL ?? file.recipientEmail ?? "hello@anomx.io",
        subjectPrefix: file.subjectPrefix ?? "Anomx early access:",
        smtp: {
            host: env.SMTP_HOST ?? file.smtp?.host ?? "",
            port: Number(env.SMTP_PORT ?? file.smtp?.port ?? 587),
            secure: env.SMTP_SECURE !== undefined ? env.SMTP_SECURE === "true" : file.smtp?.secure ?? false,
            user: env.SMTP_USER ?? file.smtp?.user ?? "",
            pass: env.SMTP_PASSWORD ?? file.smtp?.pass ?? "",
            fromEmail: env.SMTP_FROM_EMAIL ?? file.smtp?.fromEmail ?? "hello@anomx.io",
            fromName: env.SMTP_FROM_NAME ?? file.smtp?.fromName ?? "Anomx"
        }
    };
}

export function isWaitlistMailConfigured(config: WaitlistConfig) {
    return Boolean(config.recipientEmail && config.smtp.host && Number.isInteger(config.smtp.port) && config.smtp.port > 0 && config.smtp.port <= 65535 && config.smtp.fromEmail);
}
