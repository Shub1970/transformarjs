export type TimeFormat = "m" | "h" | "d";
export type Time = `${number}${TimeFormat}`;

export function getTime(strTime: Time): number {
  const timeFormat = strTime.slice(-1) as TimeFormat;
  const value = Number(strTime.slice(0, -1));

  switch (timeFormat) {
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      // This should never happen, but keeps TS happy
      throw new Error("Invalid time format");
  }
}
