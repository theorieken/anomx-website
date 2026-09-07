export function SiteLogo({ className = "", kind = "header" }: { className?: string; kind?: "footer" | "header" }) {
    return <span className={`brand-wordmark brand-wordmark-${kind} ${className}`}>
        <span className="brand-full"><span className="brand-name">Anomx</span><span className="brand-period">.</span></span>
        <span className="brand-short"><span className="brand-name">X</span><span className="brand-period">.</span></span>
    </span>;
}
