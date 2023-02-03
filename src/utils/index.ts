import dayjs from "dayjs";
import { DATE_FORMAT } from "~/constants";

export const parseDays = (date: string) => {
  const today = dayjs().format(DATE_FORMAT);
  const tomorrow = dayjs().add(1, "day").format(DATE_FORMAT);
  const yesterday = dayjs().subtract(1, "day").format(DATE_FORMAT);

  if (date === today) {
    return "Today";
  }
  if (date === tomorrow) {
    return "Tomorrow";
  }
  if (date === yesterday) {
    return "Yesterday";
  }

  const parsedDate = dayjs(date, DATE_FORMAT);
  if (parsedDate.year() > dayjs().year() || parsedDate.year() < dayjs().year()) {
    return date;
  }
  return parsedDate.format("DD/MM");
};
