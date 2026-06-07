/**
 * Returns true if the name contains Latin characters (English)
 */
export function isLatinName(name: string): boolean {
  return /[A-Za-z]/.test(name);
}

/**
 * Renders a name with correct direction — use inside JSX
 * Usage: <NameDisplay name={user?.name} />
 */
export function NameDisplay({ name, className = "" }: { name?: string; className?: string }) {
  const n = name || "المستخدم";
  const latin = isLatinName(n);
  return (
    <span
      dir={latin ? "ltr" : "rtl"}
      style={{ unicodeBidi: "embed" }}
      className={className}
    >
      {n}
    </span>
  );
}

/**
 * Returns the first character for avatar — handles both Arabic and English
 */
export function avatarLetter(name?: string): string {
  if (!name) return "م";
  return name.trim().charAt(0).toUpperCase();
}