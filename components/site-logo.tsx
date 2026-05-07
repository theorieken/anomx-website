type SiteLogoProps = {
  className?: string;
  kind?: "footer" | "header";
};

export function SiteLogo({
  className = "",
  kind = "header"
}: SiteLogoProps) {
  return (
    <span
      aria-label="Anomx"
      className={`site-logo site-logo-${kind}${className ? ` ${className}` : ""}`}
      role="img"
    >
      <span className="site-logo-word">Anomx</span>
      <span className="site-logo-dot">.</span>
    </span>
  );
}
