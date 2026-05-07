import { readFile } from "node:fs/promises";
import path from "node:path";

export type WaitlistConfig = {
  recipientEmail: string;
  smtp: {
    fromEmail: string;
    fromName: string;
    host: string;
    pass: string;
    port: number;
    secure: boolean;
    user: string;
  };
  subjectPrefix: string;
};

const waitlistConfigPath = path.join(
  process.cwd(),
  "config",
  "waitlist.config.json"
);

export async function loadWaitlistConfig() {
  const rawConfig = await readFile(waitlistConfigPath, "utf-8");

  return JSON.parse(rawConfig) as WaitlistConfig;
}

export function isWaitlistMailConfigured(config: WaitlistConfig) {
  return Boolean(
    config.recipientEmail &&
      config.smtp.host &&
      config.smtp.port &&
      config.smtp.fromEmail
  );
}
