import { access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("../", import.meta.url)));
const host = process.env.ANOMX_DEPLOY_HOST || "ssh-w0130bf4@www.theorieken.de";
const remoteRoot = process.env.ANOMX_DEPLOY_ROOT || "/www/htdocs/w0130bf4/anomx.io";
if (!/^[a-zA-Z0-9_.@-]+$/.test(host) || !remoteRoot.startsWith("/") || remoteRoot.split("/").filter(Boolean).length < 3) {
  throw new Error("Invalid deployment host or repository path.");
}
const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
const sshArgs = ["-o", "ConnectTimeout=15"];
if (process.env.ANOMX_SSH_CONTROL_PATH) sshArgs.push("-o", `ControlPath=${process.env.ANOMX_SSH_CONTROL_PATH}`);
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error || result.status !== 0) throw new Error(`${command} failed. The existing deployment is retained unless the final switch completed.`);
};
for (const file of ["build/index.html", "build/platform/index.html", "build/404.html", "build/api/waitlist.php", "build/api/vendor/autoload.php", "build/.htaccess"]) await access(file);
const stamp = new Date().toISOString().replaceAll(/[^0-9]/g, "");
const stage = `${remoteRoot}/.build-upload-${stamp}`;
const backup = `${remoteRoot}/.build-backup-${stamp}`;
const target = `${remoteRoot}/build`;
run("ssh", [...sshArgs, host, `test -d ${quote(remoteRoot)} && mkdir ${quote(stage)}`]);
const previous = spawnSync("ssh", [...sshArgs, host, `test -d ${quote(target)}`]);
const reuse = previous.status === 0 ? [`--link-dest=${target}`] : [];
run("rsync", ["-az", "--delay-updates", ...reuse, "-e", ["ssh", ...sshArgs].map(quote).join(" "), "build/", `${host}:${quote(stage)}/`]);
run("ssh", [...sshArgs, host, [
  `set -eu`,
  `php -l ${quote(stage + "/api/waitlist.php")}`,
  `test -s ${quote(stage + "/index.html")}`,
  `test -s ${quote(stage + "/api/vendor/autoload.php")}`,
  `if [ -e ${quote(target)} ]; then mv ${quote(target)} ${quote(backup)}; fi`,
  `if ! mv ${quote(stage)} ${quote(target)}; then if [ -e ${quote(backup)} ]; then mv ${quote(backup)} ${quote(target)}; fi; exit 1; fi`
].join("\n")]);
console.log(`Uploaded to ${target}. Configure this directory as the domain document root. Any previous build is retained at ${backup}.`);
console.log("Verify https://anomx.io/ and https://anomx.io/platform/ after deployment.");
