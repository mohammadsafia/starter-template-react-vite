import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classList: ClassValue[]): string {
  return twMerge(clsx(classList));
}
