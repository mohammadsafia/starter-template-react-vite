export function persistData<TValue>(key: string, value: TValue): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getPersistentData<TValue, TDefault = null>(key: string, defaultValue = null as TDefault): TValue | TDefault {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? defaultValue;
  } catch {
    return defaultValue;
  }
}
