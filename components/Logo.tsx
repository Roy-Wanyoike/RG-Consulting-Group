import Link from "next/link";
import Image from "next/image";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/#home" className={inverse ? "logo logo--inverse" : "logo"} aria-label="RG Consulting home">
    <Image className="logo-image" src="/images/rg-consulting-logo-transparent.png" alt="" width={1536} height={1024} priority={!inverse} />
  </Link>;
}
