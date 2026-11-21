export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
export const uid = () => crypto.randomUUID();

export function read<T>(key: string, fallback: T): T {
  const raw = sessionStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

export function write<T>(key: string, value: T) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
