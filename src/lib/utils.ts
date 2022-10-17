import { Record } from "pocketbase";
import { Summary } from "~/types/summary";

// Day.js
import dayjs from "dayjs"
import "dayjs/locale/es-mx"

// Day.js plugins
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.locale('es-mx')

/**
 * This converts a Pocketbase record to a Summary, removing unused keys.
 * @param record a Pocketbase record
 * @returns a Summary element
 */
export const convertToSummary = (record: Record) => {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    content: record.content,
    created: record.created,
  } as Summary
}

/**
 * Returns a phrase that determines the time passed between the
 * summary creation and the actual time.
 * @param date the summary's creation date
 * @returns a localized string of the relative time.
 */
export const getTimeFromCreation = (date: string) => {
  const timeDistance = dayjs().from(dayjs(date))
  return timeDistance
}