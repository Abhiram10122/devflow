import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  // Get the current time
  const now = new Date();

  // Calculate the time difference in seconds
  const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  // Determine appropriate units and time values
  const units = Math.floor(diff / 31536000); // Years
  if (units > 0) return `${units} year${units > 1 ? "s" : ""} ago`;

  const months = Math.floor((diff % 31536000) / 2628000); // Months
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  const weeks = Math.floor((diff % 2628000) / 604800); // Weeks
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  const days = Math.floor((diff % 604800) / 86400); // Days
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  const hours = Math.floor((diff % 86400) / 3600); // Hours
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const minutes = Math.floor((diff % 3600) / 60); // Minutes
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  // If less than a minute, return "Just now"
  return "Just now";
};

export const formatNumberShort = (num: number): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  const thresholds = [1000, 1000000, 1000000000, 1000000000000];

  if (num === 0) {
    return "0";
  }

  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);

  const index = thresholds.findIndex((threshold) => absoluteNum < threshold);
  const formattedNum =
    index === 0
      ? absoluteNum.toString()
      : (absoluteNum / thresholds[index - 1]).toFixed(1);

  const suffix = suffixes[index];

  const finalResult = `${isNegative ? "-" : ""}${formattedNum}${suffix}`;

  return finalResult;
};
