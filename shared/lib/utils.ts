import { type ClassValue, clsx } from 'clsx';
import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Callback = (...args: unknown[]) => Promise<unknown>;

export const cache = <T extends Callback>(
  cb: T,
  keyParts?: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
): T => {
  return nextCache(reactCache(cb), keyParts, options);
};
