import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const fixture = await mkdtemp(join(tmpdir(), "anomx-mail-test-"));
await mkdir(join(fixture, "build/api"), { recursive: true });
await mkdir(join(fixture, ".private"));
await cp("php/waitlist.php", join(fixture, "build/api/waitlist.php"));
await cp("php/vendor", join(fixture, "build/api/vendor"), { recursive: true });
const socket = createServer();
await new Promise(resolve => socket.listen(0, "127.0.0.1", resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const server = spawn(process.env.PHP_BIN || "php", ["-S", `127.0.0.1:${port}`, "-t", join(fixture, "build")], { stdio: "ignore" });
const url = `http://127.0.0.1:${port}/api/waitlist.php`;
let failure;
server.on("error", error => { failure = error; });
const post = (body, headers = {}) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body });
try {
  let ready = false;
  for (let tries = 0; tries < 50; tries++) {
    if (failure) throw failure;
    try { ready = (await fetch(url)).status === 405; } catch { /* wait for PHP */ }
    if (ready) break;
    await delay(100);
  }
  assert.ok(ready, "PHP 8.1+ server must start (set PHP_BIN if needed)");
  const cases = [
    ["{", {}, 400], ["{}", {}, 400], ["[]", {}, 400],
    [JSON.stringify({ fullName: {} }), {}, 400],
    ["x".repeat(12001), {}, 413],
    ["{}", { Origin: "https://example.invalid" }, 403],
    ["{}", { "Content-Type": "text/plain" }, 415],
    [JSON.stringify({ website: "bot" }), {}, 200],
  ];
  for (const [body, headers, expected] of cases) assert.equal((await post(body, headers)).status, expected);
  const valid = JSON.stringify({ fullName: "Website QA", email: "qa@example.invalid", company: "Local validation" });
  assert.equal((await post(valid)).status, 503, "Missing SMTP must never report success");
  // Deliberately invalid local SMTP target: exercises failures/rate limiting and
  // cannot send email or contact the production mailbox.
  await writeFile(join(fixture, ".private/mail.php"), "<?php return ['host'=>'127.0.0.1','port'=>1,'username'=>'test','password'=>'test-only','from_email'=>'qa@example.invalid','recipient_email'=>'qa@example.invalid'];\n");
  for (let i = 0; i < 5; i++) {
    const response = await post(valid);
    const result = await response.text();
    assert.equal(response.status, 503, result);
    assert.ok(!result.includes("test-only"), "Credentials must never appear in responses");
  }
  assert.equal((await post(valid)).status, 429, "Sixth request must be rate limited");
  console.log("PASS: method, JSON, field types, size, origin, content type, honeypot, missing SMTP, delivery failure, secret handling, and rate limiting. No email sent.");
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const stopped = new Promise(resolve => server.once("exit", resolve));
    server.kill();
    await stopped;
  }
  await rm(fixture, { recursive: true, force: true });
}
