import { access, cp, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
process.chdir(root);
const composer = spawnSync("composer", ["install", "--working-dir=php", "--no-dev", "--prefer-dist", "--no-interaction", "--no-plugins", "--no-scripts"], { stdio: "inherit" });
if (composer.error || composer.status !== 0) {
  console.error("Install PHP and Composer locally to package the contact form. The hosting server does not need Node.js or Composer.");
  process.exit(1);
}
await access("out/index.html");
await access("php/vendor/autoload.php");
await rm("build.next", { recursive: true, force: true });
await cp("out", "build.next", { recursive: true });
await mkdir("build.next/api", { recursive: true });
await cp("php/waitlist.php", "build.next/api/waitlist.php");
await cp("php/vendor", "build.next/api/vendor", { recursive: true });
await writeFile("build.next/api/vendor/.htaccess", "Require all denied\n");
await cp("php/static.htaccess", "build.next/.htaccess");
await rm("build", { recursive: true, force: true });
await rename("build.next", "build");
console.log("Static website ready in build/. Upload its contents to the domain webroot. No Node.js process is required on the server.");
