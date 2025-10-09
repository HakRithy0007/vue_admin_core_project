import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(date: string | number | null) {
  if (!date) return "...";
  return dayjs(date).utc().format("YYYY-MM-DD HH:mm:ss") + "";
}