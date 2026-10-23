import type { ReactNode } from "react";
import { PackageNavigation } from "@/components/docs/package-navigation";
import { moduleNavigation, packageReference, packageSearch } from "@/lib/package-docs";

export default function PackageLayout({ children }: { children: ReactNode }) {
  return <div className="package-layout docs-width">
    <PackageNavigation modules={moduleNavigation} entries={packageSearch} version={packageReference.version} />
    <div className="package-main">{children}</div>
  </div>;
}
