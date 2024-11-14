import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rupiahFormat(value: number) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value)
}

export function dateFormat(date: Date | null, format = "DD MMMM YYYY") {
  if (!date) {
    return dayjs().format(format)
  }
  return dayjs(date).format(format)
}