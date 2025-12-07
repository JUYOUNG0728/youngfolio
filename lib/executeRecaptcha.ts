export async function executeRecaptcha(action: string) {
  if (typeof window === "undefined") return null;

  if (!(window as any).grecaptcha || !(window as any).grecaptcha.enterprise) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const token = await (window as any).grecaptcha.enterprise.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
    { action }
  );

  const result = await fetch("/api/recaptcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, action }),
  }).then((r) => r.json());

  return result;
}
