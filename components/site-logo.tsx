import Image from "next/image";

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
      <Image
        alt=""
        aria-hidden="true"
        className="site-logo-image site-logo-image-for-light"
        height={249}
        src="/images/logo-dark.png"
        width={1086}
      />
      <Image
        alt=""
        aria-hidden="true"
        className="site-logo-image site-logo-image-for-dark"
        height={249}
        src="/images/logo-light.png"
        width={1086}
      />
    </span>
  );
}
