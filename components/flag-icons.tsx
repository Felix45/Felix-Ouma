import type { Locale } from "@/lib/i18n/config";

type FlagProps = { className?: string };

function FlagGB({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#CF142B" strokeWidth="2" />
      <rect x="12" width="6" height="20" fill="#FFFFFF" />
      <rect y="7" width="30" height="6" fill="#FFFFFF" />
      <rect x="13.5" width="3" height="20" fill="#CF142B" />
      <rect y="8.5" width="30" height="3" fill="#CF142B" />
    </svg>
  );
}

function FlagFR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  );
}

function FlagKE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="30" height="6" fill="#000000" />
      <rect y="7" width="30" height="6" fill="#BB0000" />
      <rect y="14" width="30" height="6" fill="#006600" />
    </svg>
  );
}

const flagComponents: Record<Locale, (props: FlagProps) => React.JSX.Element> = {
  en: FlagGB,
  fr: FlagFR,
  sw: FlagKE,
  luo: FlagKE,
};

export function FlagIcon({ locale, className }: { locale: Locale; className?: string }) {
  const Flag = flagComponents[locale];
  return <Flag className={className} />;
}
