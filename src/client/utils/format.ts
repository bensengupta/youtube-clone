import { intlFormatDistance, isBefore, sub } from "date-fns";

export function formatPublishedAtDate(publishedAt: Date) {
  const today = new Date();

  const options = { numeric: "always" };

  const oneMinuteAgo = sub(today, { minutes: 1 });
  if (isBefore(oneMinuteAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, {
      unit: "second",
      ...options,
    });
  }

  const oneHourAgo = sub(today, { hours: 1 });
  if (isBefore(oneHourAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, {
      unit: "minute",
      ...options,
    });
  }

  const oneDayAgo = sub(today, { days: 1 });
  if (isBefore(oneDayAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, { unit: "hour", ...options });
  }

  const oneWeekAgo = sub(today, { weeks: 1 });
  if (isBefore(oneWeekAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, { unit: "day", ...options });
  }

  const oneMonthAgo = sub(today, { months: 1 });
  if (isBefore(oneMonthAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, { unit: "week", ...options });
  }

  const oneYearAgo = sub(today, { years: 1 });
  if (isBefore(oneYearAgo, publishedAt)) {
    return intlFormatDistance(publishedAt, today, {
      unit: "month",
      ...options,
    });
  }

  return intlFormatDistance(publishedAt, today, { unit: "year", ...options });
}

function formatNumeric(num: number) {
  // 123 => 123
  if (num < 1e3) {
    return `${num}`;
  }

  // 123000 => 123K
  if (num < 1e6) {
    let thousands = Math.floor(num / 1e3);
    if (thousands < 10) {
      thousands = Math.floor(num / 1e2) / 10;
    }
    return `${thousands}K`;
  }

  // 123000000 => 123M
  if (num < 1e9) {
    let millions = Math.floor(num / 1e6);
    if (millions < 10) {
      millions = Math.floor(num / 1e5) / 10;
    }
    return `${millions}M`;
  }

  // 123000000000 => 123B
  if (num < 1e12) {
    let billions = Math.floor(num / 1e9);
    if (billions < 10) {
      billions = Math.floor(num / 1e8) / 10;
    }
    return `${billions}B`;
  }

  return `999B+`;
}

export function formatViewCount(viewCount: number) {
  return formatNumeric(viewCount);
}

export function formatSubscriberCount(subscriberCount: number) {
  return formatNumeric(subscriberCount);
}

export function formatVideoDuration(durationSeconds: number) {
  const seconds = durationSeconds % 60;
  const minutes = durationSeconds / 60;
  const hours = durationSeconds / 60 / 60;

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
