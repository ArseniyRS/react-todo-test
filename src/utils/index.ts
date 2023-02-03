import dayjs from "dayjs";

export const parseDays = (date: string) => {
  const today = dayjs().format("DD/MM/YYYY");
  const tomorrow = dayjs().add(1, "day").format("DD/MM/YYYY");
  const yesterday = dayjs().subtract(1, "day").format("DD/MM/YYYY");

  if (date === today) {
    return "Today";
  }
  if (date === tomorrow) {
    return "Tomorrow";
  }
  if (date === yesterday) {
    return "Yesterday";
  }

  const parsedDate = dayjs(date, "DD/MM/YYYY");
  if (parsedDate.year() > dayjs().year() || parsedDate.year() < dayjs().year()) {
    return date;
  }
  return parsedDate.format("DD/MM");
};
