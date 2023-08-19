import { intlFormatDistance, isBefore, sub } from "date-fns";
import parseISODuration from "./parseISODuration";

export function formatPublishedAtDate(publishedAt: string) {
  const today = new Date();
  const date = new Date(publishedAt);

  const options = { numeric: "always" };

  const oneMinuteAgo = sub(today, { minutes: 1 });
  if (isBefore(oneMinuteAgo, date)) {
    return intlFormatDistance(date, today, { unit: "second", ...options });
  }

  const oneHourAgo = sub(today, { hours: 1 });
  if (isBefore(oneHourAgo, date)) {
    return intlFormatDistance(date, today, { unit: "minute", ...options });
  }

  const oneDayAgo = sub(today, { days: 1 });
  if (isBefore(oneDayAgo, date)) {
    return intlFormatDistance(date, today, { unit: "hour", ...options });
  }

  const oneWeekAgo = sub(today, { weeks: 1 });
  if (isBefore(oneWeekAgo, date)) {
    return intlFormatDistance(date, today, { unit: "day", ...options });
  }

  const oneMonthAgo = sub(today, { months: 1 });
  if (isBefore(oneMonthAgo, date)) {
    return intlFormatDistance(date, today, { unit: "week", ...options });
  }

  const oneYearAgo = sub(today, { years: 1 });
  if (isBefore(oneYearAgo, date)) {
    return intlFormatDistance(date, today, { unit: "month", ...options });
  }

  return intlFormatDistance(date, today, { unit: "year", ...options });
}

export function formatViewCount(viewCount: number) {
  // 123 => 123
  if (viewCount < 1e3) {
    return `${viewCount}`;
  }

  // 123000 => 123K
  if (viewCount < 1e6) {
    let thousands = Math.floor(viewCount / 1e3);
    if (thousands < 10) {
      thousands = Math.floor(viewCount / 1e2) / 10;
    }
    return `${thousands}K`;
  }

  // 123000000 => 123M
  if (viewCount < 1e9) {
    let millions = Math.floor(viewCount / 1e6);
    if (millions < 10) {
      millions = Math.floor(viewCount / 1e5) / 10;
    }
    return `${millions}M`;
  }

  // 123000000000 => 123B
  if (viewCount < 1e12) {
    let billions = Math.floor(viewCount / 1e9);
    if (billions < 10) {
      billions = Math.floor(viewCount / 1e8) / 10;
    }
    return `${billions}B`;
  }

  return `999B+`;
}

export function formatVideoLength(length: string) {
  const { hours = 0, minutes = 0, seconds = 0 } = parseISODuration(length);

  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

export function formatAvatarInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .filter((word) => word.length > 0)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}
