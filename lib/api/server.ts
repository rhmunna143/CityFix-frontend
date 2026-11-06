const BASE =
  process.env.API_BASE_URL ?? "https://cityfix-backend-lime.vercel.app/api/v1";

export async function serverFetch<T>(
  path: string,
  opts: { revalidate?: number; tags?: string[] } = {}
): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate: opts.revalidate ?? 60, tags: opts.tags },
    });
    if (!res.ok) return null;
    return ((await res.json()) as { data: T }).data;
  } catch {
    return null;
  }
}
