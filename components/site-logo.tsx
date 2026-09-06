import Image from "next/image";

export function SiteLogo({ className = "", kind = "header" }: { className?: string; kind?: "footer" | "header" }) {
    return <span className={`brand-wordmark brand-wordmark-${kind} ${className}`}>
        <Image alt="" src="/images/app-icon.webp" width={36} height={36} />
        <span>anomx<span className="brand-period">.</span></span>
    </span>;
}
