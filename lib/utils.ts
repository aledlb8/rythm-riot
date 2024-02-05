import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getChallengeTimeAndDuration(minutes: number): { challengeTime: string; duration: number } {
  const duration = minutes * 60 * 1000;
  const challengeTime = `${minutes.toString().padStart(2, '0')}:00`;
  return { challengeTime, duration };
}