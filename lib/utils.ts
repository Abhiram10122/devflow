import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

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

  // console.log("Printing This", finalResult);

  return finalResult;
};

export function getMonthYear(date: Date): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = date.getMonth(); // Get the month index (0-11)
  const year = date.getFullYear(); // Get the full year

  return `${monthNames[monthIndex]} ${year}`; // Use template literal for formatting
}

interface FormUrlQueryProps {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: FormUrlQueryProps) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryProps {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryProps) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
};
