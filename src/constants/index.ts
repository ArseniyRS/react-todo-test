import dayjs from "dayjs";

export const DATE_FORMAT = "DD/MM/YYYY";
export const TODAY = dayjs().format(DATE_FORMAT);
export const TOMORROW = dayjs().add(1, "day").format(DATE_FORMAT);
export const YESTERDAY = dayjs().subtract(1, "day").format(DATE_FORMAT);
