import dayjs from "dayjs";

export const TODAY = dayjs().format("DD/MM/YYYY");
export const TOMORROW = dayjs().add(1, "day").format("DD/MM/YYYY");
export const YESTERDAY = dayjs().subtract(1, "day").format("DD/MM/YYYY");
